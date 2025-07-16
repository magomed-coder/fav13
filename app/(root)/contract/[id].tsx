import { useLocalSearchParams } from "expo-router";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { ScreenHeader } from "@/components/ScreenHeader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { COLORS } from "@/constants/theme";

import {
  extractResidentialComplex,
  formatDateWithYear,
  formatMonthYear,
  formatNumberRegex,
  getContractData,
} from "@/lib/helpers";

import { CalendarMonth, buildPaymentCalendar } from "@/lib/contract.helpers";
import { Contract, Order, PaymentCalendarEntry, Receipt } from "@/types";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles";
import { CheckCircleIcon } from "@/assets/svg/CheckCircleIcon";
import { EmptyCircleIcon } from "@/assets/svg/EmptyCircleIcon";
import { ArrowIcon } from "@/assets/svg/ArrowIcon";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useUserContext } from "@/context/user-provider";

interface ContractData {
  contract?: Contract;
  order?: Order;
  paymentcalendar?: PaymentCalendarEntry;
  receipts: Receipt[];
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const RECEIPT_ITEM_WIDTH = 21 + 9 * 2;

const ContractPage = () => {
  const [visibleYear, setVisibleYear] = useState<string>(
    new Date().getFullYear().toString()
  );

  const { id } = useLocalSearchParams<{ id?: string }>();
  const { user } = useUserContext();

  const [data, setData] = useState<ContractData>({
    contract: undefined,
    order: undefined,
    paymentcalendar: undefined,
    receipts: [],
  });

  // Вызывается после того, как скролл «успокоился»
  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / RECEIPT_ITEM_WIDTH);
    if (index >= 0 && index < calendarMonths.length) {
      // monthKey = "2025-06", год можно вытащить через split или Date
      const yearStr = calendarMonths[index].monthKey.split("-")[0];
      setVisibleYear(yearStr);
    }
  };
  const [selectedMonth, setSelectedMonth] = useState<CalendarMonth | null>(
    null
  );

  const { contract, order, receipts, paymentcalendar } = data;

  const avgMonthlyPayment = paymentcalendar?.monthly_calendar_payment || 1;

  const totalPaid =
    receipts.reduce((sum, { payment_amount }) => {
      const amount = parseFloat(payment_amount);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0) || 0;

  const totalDebt = paymentcalendar
    ? parseFloat(paymentcalendar.total_debt)
    : 0;

  const residentialComplex = extractResidentialComplex(order?.nomenclature);
  const currentDebt = Number(paymentcalendar?.due_now) || 0;

  // 2) разница
  const paidDiff = totalPaid - currentDebt;

  // 3) формируем строковое представление с разделителями
  const formattedDiff = formatNumberRegex(Math.abs(paidDiff)) + " р.";

  // 4) выбираем цвет
  const diffColor =
    paidDiff < 0
      ? COLORS.TextRed
      : paidDiff > 0 || paidDiff === 0
      ? COLORS.TextGreen
      : COLORS.TextRed;

  // 5) подпись
  const diffLabel =
    paidDiff < 0 ? "Долг" : paidDiff > 0 ? "Переплата" : "Баланс";

  // Хук и реф для горизонтального скролла
  const scrollRef = useRef<ScrollView>(null);
  const [scrollX, setScrollX] = useState(0);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollX(event.nativeEvent.contentOffset.x);
  };

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: scrollX + offset, animated: true });
    }
  };

  const calendarMonths: CalendarMonth[] = useMemo(
    () => buildPaymentCalendar(paymentcalendar, totalPaid, avgMonthlyPayment),
    [paymentcalendar, totalPaid]
  );

  useEffect(() => {
    if (scrollRef.current && calendarMonths.length > 0) {
      const now = new Date();
      // Формируем ключ, как в CalendarMonth.monthKey, например "2025-06"
      const currentKey = `${now.getFullYear()}-${String(
        now.getMonth() + 1
      ).padStart(2, "0")}`;
      const idx = calendarMonths.findIndex((m) => m.monthKey === currentKey);
      if (idx >= 0) {
        const x = idx * RECEIPT_ITEM_WIDTH;
        scrollRef.current.scrollTo({ x, animated: false });
        // Устанавливаем visibleYear по найденному месяцу
        setVisibleYear(currentKey.split("-")[0]);
        setSelectedMonth(calendarMonths[idx]);
      }
    }
  }, [calendarMonths]);

  useEffect(() => {
    if (user) {
      setData(getContractData(id, user));
    }
  }, [id, user]);

  if (!contract || !order) {
    return <Text>Загрузка…</Text>;
  }

  // 2) Находим индекс последнего оплаченного
  const lastPaidIndex = calendarMonths.findLastIndex((m) => m.paid);

  // 3) Считаем индекс следующего
  const nextMonthIndex = lastPaidIndex + 1;

  // 4) Берём следующий месяц или null, если вышли за границы
  const nextMonth =
    nextMonthIndex >= 0 && nextMonthIndex < calendarMonths.length
      ? calendarMonths[nextMonthIndex]
      : null;

  // если ни один месяц не выбран — покажем 0
  const monthlyPaidAmount = selectedMonth?.paid ? avgMonthlyPayment : 0;

  // форматируем
  const formattedMonthlyPaid =
    paidDiff != 0 && nextMonth?.monthKey === selectedMonth?.monthKey
      ? formatNumberRegex(Math.abs(paidDiff)) + " р."
      : formatNumberRegex(monthlyPaidAmount) + " р.";

  console.log({ totalPaid, totalDebt, paidDiff, currentDebt });

  return (
    <SafeAreaView style={styles.pageContainer}>
      <StatusBar style="dark" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader showBack />

        <ThemedText variant="h4" style={styles.mainTitle}>
          {residentialComplex}
        </ThemedText>

        <View style={styles.detailsRow}>
          <View style={styles.detailTextWrapper}>
            <ThemedText variant="m500.14" style={styles.contractNumber}>
              Договор {contract.number}
            </ThemedText>
          </View>

          <View style={styles.dividerLine} />

          <View style={styles.detailTextWrapper}>
            <ThemedText variant="m500.14" style={styles.contractDate}>
              От {formatDateWithYear(contract.date)}
            </ThemedText>
          </View>
        </View>

        <ThemedText variant="m400.14" style={styles.nomenclatureText}>
          Адрес: {order.nomenclature}
        </ThemedText>

        <ThemedView style={styles.summaryContainer}>
          <ThemedText variant="h6" style={styles.summaryText}>
            {formatNumberRegex(totalPaid)} / {formatNumberRegex(totalDebt)}
          </ThemedText>
          <ThemedText variant="h5" style={styles.summarySubText}>
            Внесенные средства / Сумма сделки
          </ThemedText>
        </ThemedView>

        <ThemedText variant="m600.16" style={styles.sectionTitle}>
          Календарь выплат:
          <ThemedText variant="m400.12" style={styles.yearText}>
            {visibleYear}
          </ThemedText>
        </ThemedText>

        {calendarMonths.length > 0 ? (
          <View style={styles.receiptsContainer}>
            <TouchableOpacity
              style={[styles.arrowButton, styles.leftArrow]}
              onPress={() => scrollBy(-SCREEN_WIDTH / 2)}
            >
              <ArrowIcon rotation={180} width={4.5} height={9} />
            </TouchableOpacity>

            <ScrollView
              ref={scrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.receiptsScroll}
              onScroll={onScroll}
              scrollEventThrottle={16}
              onMomentumScrollEnd={onMomentumScrollEnd}
              snapToInterval={RECEIPT_ITEM_WIDTH}
              decelerationRate="fast"
            >
              {calendarMonths.map((item) => (
                <TouchableOpacity
                  onPress={() => setSelectedMonth(item)}
                  key={item.monthKey}
                  style={[
                    styles.receiptBadge,
                    selectedMonth?.monthKey === item.monthKey &&
                      styles.receiptBadgeSelected,
                  ]}
                >
                  {item.paid ? (
                    <CheckCircleIcon
                      strokeColor={
                        selectedMonth?.monthKey === item.monthKey
                          ? COLORS.BGWhite
                          : "#000000"
                      }
                    />
                  ) : (
                    <EmptyCircleIcon />
                  )}
                  <ThemedText
                    variant="h8"
                    style={[
                      styles.receiptMonthText,
                      selectedMonth?.monthKey === item.monthKey &&
                        styles.receiptMonthTextSelected,
                    ]}
                  >
                    {item.display}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={[styles.arrowButton, styles.rightArrow]}
              onPress={() => scrollBy(SCREEN_WIDTH / 2)}
            >
              <ArrowIcon width={4.5} height={9} />
            </TouchableOpacity>
          </View>
        ) : (
          <ThemedText variant="h3">Квитанций не найдено.</ThemedText>
        )}

        <ThemedText variant="m600.12" style={styles.actualReceiptDataText}>
          {formatMonthYear()}
        </ThemedText>

        <PaymentRow
          label="Оплачено:"
          amount={formattedMonthlyPaid}
          date={
            selectedMonth?.monthKey
              ? formatDateWithYear(selectedMonth?.monthKey)
              : formatDateWithYear(new Date().toISOString())
          }
          labelStyle={{ color: COLORS.TextGreen }}
        />

        <PaymentRow
          label="К оплате:"
          amount={`${formatNumberRegex(avgMonthlyPayment)} р.`}
          date={formatDateWithYear(contract.date)}
          style={styles.paymentRow}
          labelStyle={{ color: COLORS.TextRed }}
        />

        <PaymentRow
          label={"Актуальное состояние: " + diffLabel}
          amount={formattedDiff}
          date={formatDateWithYear(new Date().toISOString())}
          labelStyle={{ color: diffColor }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

type PaymentRowProps = {
  label: string;
  amount: string;
  date: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
};

const PaymentRow: React.FC<PaymentRowProps> = ({
  label,
  amount,
  date,
  style,
  labelStyle,
}) => (
  <View style={[styles.actualReceiptBox, style]}>
    <ThemedText
      variant="m500.12"
      style={[styles.actualReceiptTopText, labelStyle]}
    >
      {label}
    </ThemedText>
    <View style={styles.detailsRow}>
      <View style={styles.detailTextWrapper}>
        <ThemedText variant="m600.12" style={styles.contractNumber}>
          {amount}
        </ThemedText>
      </View>
      <View style={styles.dividerLine} />
      <View style={styles.detailTextWrapper}>
        <ThemedText variant="m400.12" style={styles.receiptDataText}>
          {date}
        </ThemedText>
      </View>
    </View>
  </View>
);

export default ContractPage;
