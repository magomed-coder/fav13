import React, { useState, useEffect } from "react";
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

const MIN_COST = 500_000;
const MAX_COST = 100_000_000;

const options = [
  { key: "secondary", label: "Вторичное жилье" },
  { key: "car_light", label: "Легковое авто" },
  { key: "car_heavy", label: "Грузовое авто" },
  { key: "new_with", label: "Новостройки (с взносом)" },
  { key: "new_without", label: "Новостройки (без взноса)" },
];

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

  // пересчитать при изменениях
  useEffect(() => {
    const price = parseFloat(rawCost) || 0;
    const first = price * (downPercent / 100);
    const remainder = price - first;
    const contractSum = price + first * 0.5;
    // месячный платёж за всё время (termYears * 12)
    const months = termYears * 12;
    const monthly = remainder > 0 ? remainder / months : 0;
    setResults({ contractSum, firstPayment: first, monthly });
  }, [rawCost, downPercent, termYears]);

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScreenHeader showBack style={styles.padding} />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Опции калькулятора */}
        <ThemedText style={styles.sectionLabel}>Категория</ThemedText>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedOption}
            onValueChange={setSelectedOption}
            mode="dropdown"
          >
            {options.map((opt) => (
              <Picker.Item key={opt.key} label={opt.label} value={opt.key} />
            ))}
          </Picker>
        </View>

        <ThemedText variant="m600.16" style={styles.mainLabel}>
          Калькулятор
        </ThemedText>
        <ThemedText variant="m600.16" style={styles.label}>
          Предварительный расчет по рассрочке
        </ThemedText>
        <ThemedText style={styles.blueLabel}>Стоимость</ThemedText>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={displayCost}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
        />
        <ThemedText variant="m400.10" style={styles.helper}>
          Мин: 500.000 руб. - Макс: 100.000.000 руб.
        </ThemedText>
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
          minimumValue={20}
          maximumValue={50}
          step={1}
          value={downPercent}
          onValueChange={setDownPercent}
          style={styles.slider}
          minimumTrackTintColor="rgba(26, 46, 64, 1)"
          maximumTrackTintColor="rgba(217, 217, 217, 1)"
          thumbTintColor="rgba(26, 46, 64, 1)"
        />
        <View style={styles.sliderSection}>
          <View>
            <ThemedText variant="m500.12">20 %</ThemedText>
          </View>
          <View>
            <ThemedText variant="m500.12">50 %</ThemedText>
          </View>
        </View>

        <ThemedText style={styles.blueLabel}>Срок рассрочки</ThemedText>
        <View style={styles.termContainer}>
          <TouchableOpacity
            onPress={() => setTermYears((prev) => Math.max(1, prev - 1))}
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
            onPress={() => setTermYears((prev) => Math.min(4, prev + 1))}
            style={styles.arrowWrapperRight}
          >
            <ArrowIcon width={8.5} height={19} />
          </TouchableOpacity>
        </View>

        <ThemedText variant="m600.16">Результат расчета</ThemedText>
        <View style={styles.results}>
          <View style={styles.resultTop}>
            <ThemedText>
              Стоимость: {Number(rawCost).toLocaleString()} руб.
            </ThemedText>
            <ThemedText>
              Первоначальный взнос:{" "}
              {results.firstPayment.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}{" "}
              руб.
            </ThemedText>
            <ThemedText>Срок рассрочки: {formatYears(termYears)}</ThemedText>
          </View>
          <View style={styles.resultBottom}>
            <ThemedText>
              Сумма договора рассрочки:{" "}
              {results.contractSum.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}{" "}
              руб.
            </ThemedText>
            <ThemedText>
              Первоначальный платеж:{" "}
              {results.firstPayment.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}{" "}
              руб.
            </ThemedText>
            <ThemedText>
              Ежемесячный платеж:{" "}
              {results.monthly.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}{" "}
              руб.
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: COLORS.BGWhite, flex: 1 },
  content: { padding: 16 },
  padding: { marginHorizontal: 16 },
  toggleContainer: { flexDirection: "row", marginVertical: 12 },
  toggleButton: {
    flex: 1,
    padding: 8,
    alignItems: "center",
  },
  toggleActive: { backgroundColor: COLORS.BGDarkBlue },
  sectionLabel: {
    color: COLORS.TextBlue,
    marginBottom: 8,
    fontFamily: FONTS.MontserratMedium,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: COLORS.BGGrey,
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  blueLabel: { color: COLORS.TextBlue, marginBottom: 6 },
  mainLabel: { marginBottom: 10 },
  label: { marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: COLORS.BGGrey,
    paddingTop: 11,
    paddingBottom: 9,
    paddingHorizontal: 15,
    fontFamily: FONTS.MontserratMedium,
    fontSize: 14,
  },
  sliderSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  slider: {
    height: 40,
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginVertical: 0,
    marginHorizontal: -10,
  },
  helper: { color: COLORS.TextBlack, marginBottom: 12 },
  termContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
    width: 125,
  },
  termValueWrapper: {
    borderWidth: 1,
    borderColor: COLORS.BGGrey,
    width: 75,
    borderRadius: 18,
    paddingVertical: 6,
  },
  termValue: {
    textAlign: "center",
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
  resultTop: {},
  resultBottom: {},
});

export default CalculatorPage;

function formatWithSpaces(value: string): string {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatYears(years: number): string {
  if (years === 1) return `${years} год`;
  return `${years} года`;
}
