import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ThemedText } from "@/components/ThemedText";
import { COLORS, FONTS } from "@/constants/theme";
import { StatusBar } from "expo-status-bar";
import Slider from "@react-native-community/slider";
import { ArrowIcon } from "@/assets/svg/ArrowIcon";
import { Picker } from "@react-native-picker/picker";
import InfoDivider from "@/components/ui/InfoDivider";
import { MAX_COST, MIN_COST, options } from "@/constants/data";

const CalculatorPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>(options[0].key);
  const [rawCost, setRawCost] = useState<string>("");
  const [displayCost, setDisplayCost] = useState<string>("");

  const [downPercent, setDownPercent] = useState<number>(20);
  const [termYears, setTermYears] = useState<number>(2);
  const [results, setResults] = useState({
    contractSum: 0,
    firstPayment: 0,
    monthly: 0,
  });

  const currentConfig = useMemo(
    () => optionConfigs.find((c) => c.key === selectedOption)!,
    [selectedOption]
  );

  useEffect(() => {
    setDownPercent((dp) =>
      dp < currentConfig.minDownPercent ? currentConfig.minDownPercent : dp
    );
    // также можно сбросить termYears в [minYears…maxYears], если он выходит за границы
    setTermYears((ty) =>
      ty < currentConfig.minYears
        ? currentConfig.minYears
        : ty > currentConfig.maxYears
        ? currentConfig.maxYears
        : ty
    );

    if (selectedOption === "new_without") {
      setDownPercent(0);
    }
  }, [currentConfig]);

  // пересчитать при изменениях
  useEffect(() => {
    let price = parseFloat(rawCost) || 0;

    // ставка наценки по termYears (1-based → 0-based)
    const markupRate = currentConfig.markupRates[termYears - 1] || 0;

    // 1) считаем «грязную» сумму с наценкой от полной цены:
    let grossSum = price + price * (markupRate / 100);

    let first = (grossSum * downPercent) / 100;

    // 2) вычитаем первоначальный взнос в рублях:
    let contractSum = grossSum - first;
    let grossSum1 = 0;

    if (selectedOption === "new_with") {
      first = (price * downPercent) / 100;
      price = price - first;
      grossSum1 = price + price * (markupRate / 100);
      contractSum = grossSum1;
      grossSum = grossSum1 + first;
    }

    // 3) ежемесячный платёж = остаток (contractSum) / месяцев
    const months = termYears * 12;
    const monthly = months > 0 ? contractSum / months : 0;

    setResults({ contractSum: grossSum, firstPayment: first, monthly });
  }, [rawCost, downPercent, termYears, selectedOption]);

  const onChangeText = (text: string) => {
    // Убираем всё, кроме цифр
    const digits = text.replace(/\D+/g, "");

    let numeric = parseInt(digits || "0", 10);
    if (numeric > MAX_COST) {
      numeric = MAX_COST;
    }
    const limited = String(numeric);
    setRawCost(limited);
    setDisplayCost(formatWithSpaces(limited));
  };

  const onEndEditing = () => {
    const price = parseInt(rawCost || "0", 10);
    if (price < MIN_COST) {
      setRawCost(String(MIN_COST));
      setDisplayCost(formatWithSpaces(String(MIN_COST)));
    }
  };

  const hasInitialPayment = selectedOption !== "new_without";

  const handleSliderChange = (value: number) => {
    setDownPercent(Math.round(value));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScreenHeader showBack style={styles.padding} />
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText variant="m600.16" style={styles.mainLabel}>
          Калькулятор
        </ThemedText>

        <ThemedText variant="m600.16" style={styles.label}>
          Предварительный расчет по рассрочке
        </ThemedText>

        {/* Опции калькулятора */}
        <ThemedText variant="m600.12" style={styles.blueLabel}>
          Тип имущества
        </ThemedText>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedOption}
            onValueChange={setSelectedOption}
            mode="dropdown"
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {options.map((opt) => (
              <Picker.Item key={opt.key} label={opt.label} value={opt.key} />
            ))}
          </Picker>
        </View>

        <ThemedText variant="m600.12" style={styles.blueLabel}>
          Стоимость
        </ThemedText>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={displayCost}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
          placeholder="Введите сумму"
        />
        <ThemedText variant="m400.10" style={styles.helper}>
          Мин: 500.000 руб. - Макс: 100.000.000 руб.
        </ThemedText>

        {hasInitialPayment && (
          <>
            <View style={styles.sliderSection}>
              <View>
                <ThemedText variant="m500.12">
                  Первоначальный взнос (в %):
                </ThemedText>
              </View>
              <View>
                <ThemedText variant="m500.12">{downPercent} %</ThemedText>
              </View>
            </View>
            <Slider
              minimumValue={currentConfig.minDownPercent}
              maximumValue={50}
              step={1}
              value={downPercent}
              onValueChange={handleSliderChange}
              onSlidingComplete={handleSliderChange}
              style={styles.slider}
              minimumTrackTintColor={COLORS.BGDarkBlue}
              maximumTrackTintColor={COLORS.BGGrey}
              thumbTintColor={COLORS.BGDarkBlue}
            />
            <View style={styles.sliderBottomSection}>
              <View>
                <ThemedText variant="m500.12">
                  {currentConfig.minDownPercent} %
                </ThemedText>
              </View>
              <View>
                <ThemedText variant="m500.12">50 %</ThemedText>
              </View>
            </View>
          </>
        )}

        <ThemedText variant="m600.12" style={styles.blueLabel}>
          Срок рассрочки
        </ThemedText>
        <View style={styles.termContainer}>
          <TouchableOpacity
            onPress={() =>
              setTermYears((prev) => Math.max(currentConfig.minYears, prev - 1))
            }
            style={styles.arrowWrapperLeft}
          >
            <ArrowIcon rotation={180} width={8.5} height={19} />
          </TouchableOpacity>
          <View style={styles.termValueWrapper}>
            <ThemedText variant="m400.12" style={styles.termValue}>
              {formatYears(termYears)}
            </ThemedText>
          </View>
          <TouchableOpacity
            onPress={() =>
              setTermYears((prev) => Math.min(currentConfig.maxYears, prev + 1))
            }
            style={styles.arrowWrapperRight}
          >
            <ArrowIcon width={8.5} height={19} />
          </TouchableOpacity>
        </View>

        <ThemedText variant="m600.16" style={styles.label}>
          Результат расчета
        </ThemedText>
        <View style={styles.results}>
          <View style={styles.resultTop}>
            <InfoDivider
              left="Стоимость"
              right={`${formatWithSpaces(rawCost)} руб.`}
            />
            {hasInitialPayment && (
              <InfoDivider
                left="Первоначальный взнос (в %)"
                right={`${downPercent} %`}
              />
            )}
            <InfoDivider
              left="Срок рассрочки"
              right={`${termYears * 12} мес.`}
            />
          </View>
          <View style={styles.resultBottom}>
            <InfoDivider
              left={"Сумма договора рассрочки:"}
              right={`${results.contractSum.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}`}
              textStyle={styles.resultBottomText}
            />
            {hasInitialPayment && (
              <InfoDivider
                left={"Первоначальный платеж:"}
                right={`${results.firstPayment.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}`}
                textStyle={styles.resultBottomText}
              />
            )}

            <InfoDivider
              left={"Ежемесячный платеж:"}
              right={`${results.monthly.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}`}
              textStyle={styles.resultBottomText}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: COLORS.BGWhite, flex: 1 },
  content: { marginHorizontal: 16 },
  padding: { marginHorizontal: 16 },

  sectionLabel: {
    color: COLORS.TextBlue,
    fontFamily: FONTS.MontserratMedium,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: COLORS.BGGrey,
    borderRadius: 15,
    overflow: "hidden",
    justifyContent: "center",
    marginBottom: 10,
  },
  picker: { height: 55 },
  pickerItem: { fontFamily: FONTS.MontserratMedium, fontSize: 14 },
  blueLabel: {
    color: COLORS.TextBlue,
    marginBottom: 6,
  },
  mainLabel: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: COLORS.BGGrey,
    paddingTop: 11,
    paddingBottom: 9,
    paddingHorizontal: 15,
    fontFamily: FONTS.MontserratMedium,
    fontSize: 14,
    height: 50,
    marginBottom: 10,
  },
  sliderSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sliderBottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  slider: {
    height: 25,
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginVertical: 0,
    marginHorizontal: -10,
  },
  helper: {
    color: COLORS.TextBlack,
    marginBottom: 40,
  },
  termContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 125,
    marginBottom: 40,
  },
  termValueWrapper: {
    borderWidth: 1,
    borderColor: COLORS.BGGrey,
    width: 75,
    borderRadius: 18,
  },
  termValue: {
    textAlign: "center",
    paddingVertical: 10,
  },
  arrowWrapperLeft: {
    paddingRight: 10,
    paddingVertical: 5,
  },
  arrowWrapperRight: {
    paddingLeft: 10,
    paddingVertical: 5,
  },
  results: {},
  resultTop: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  resultBottom: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.BGSlate,
  },
  resultBottomText: {
    fontSize: 14,
    fontFamily: FONTS.MontserratRegular,
  },
});

export default CalculatorPage;

function formatWithSpaces(value: string): string {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatYears(years: number): string {
  if (years === 1) return `${years} год`;
  if (years > 4) return `${years} лет`;
  return `${years} года`;
}

const getMaxYears = (option: string): number => {
  switch (option) {
    case "car_light":
    case "car_heavy":
      return 3;
    case "secondary":
      return 4;
    case "new_with":
    case "new_without":
      return 6;
    default:
      return 4;
  }
};

interface OptionConfig {
  key: string;
  label: string;
  minDownPercent: number; // минимальный % первого взноса
  minYears: number; // минимальный срок (в годах)
  maxYears: number; // максимальный срок (в годах)
  markupRates: number[]; // наценка (%) для каждого года рассрочки
}

const optionConfigs: OptionConfig[] = [
  {
    key: "secondary",
    label: "Вторичное жилье",
    minDownPercent: 20,
    minYears: 1,
    maxYears: 4,
    markupRates: [15, 25, 35, 40], // для 1,2,3,4 лет
  },
  {
    key: "car_light",
    label: "Легковое авто",
    minDownPercent: 20,
    minYears: 1,
    maxYears: 3,
    markupRates: [20, 30, 40], // для 1,2,3 лет
  },
  {
    key: "car_heavy",
    label: "Грузовое авто (техника)",
    minDownPercent: 20,
    minYears: 1,
    maxYears: 3,
    markupRates: [18, 28, 38], // для 1,2,3 лет
  },
  {
    key: "new_without",
    label: "Новостройки (без пер. взноса)",
    minDownPercent: 0,
    minYears: 1,
    maxYears: 6,
    markupRates: [0, 15, 25, 30, 35, 40], // для 1…6 лет
  },
  {
    key: "new_with",
    label: "Новостройки (с пер. взносом)",
    minDownPercent: 0, // любая сумма >0%
    minYears: 1,
    maxYears: 6, // теперь до 6 лет
    markupRates: [0, 15, 25, 30, 35, 40], // также 6 значений
  },
];
