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
import { useGlobalContext } from "@/context/global-provider";
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

interface ContractData {
  contract?: Contract;
  order?: Order;
  paymentcalendar?: PaymentCalendarEntry;
  receipts: Receipt[];
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const RECEIPT_ITEM_WIDTH = 21 + 9 * 2;
const _avgMonthlyPayment = 80500;

const ContractPage = () => {
  const [visibleYear, setVisibleYear] = useState<string>(
    new Date().getFullYear().toString()
  );

  const { id } = useLocalSearchParams<{ id?: string }>();
  const { user } = useGlobalContext();

  const [data, setData] = useState<ContractData>({
    contract: undefined,
    order: undefined,
    paymentcalendar: undefined,
    receipts: [],
  });

  useEffect(() => {
    if (user) {
      setData(getContractData(id, user));

      if (user.receipts.length > 0) {
        const date0 = new Date(user.receipts[0].receipt_date);
        setVisibleYear(date0.getFullYear().toString());
      }
    }
  }, [id, user]);

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

  const { contract, order, receipts, paymentcalendar } = data;

  const totalPaid =
    receipts.reduce((sum, { payment_amount }) => {
      const amount = parseFloat(payment_amount);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0) || 0;

  const totalDebt = paymentcalendar
    ? parseFloat(paymentcalendar.total_debt)
    : 0;

  const residentialComplex = extractResidentialComplex(order?.nomenclature);

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
    () => buildPaymentCalendar(paymentcalendar, totalPaid, _avgMonthlyPayment),
    [paymentcalendar, totalPaid]
  );

  if (!contract || !order) {
    return <Text>Загрузка…</Text>;
  }

  return (
    <SafeAreaView style={styles.pageContainer}>
      <StatusBar
        backgroundColor={COLORS.BGWhite}
        style="dark"
        translucent={false}
      />

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
          Календарь выплат:{" "}
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
              {calendarMonths.map(({ monthKey, display, paid }) => (
                <View key={monthKey} style={styles.receiptBadge}>
                  {paid ? <CheckCircleIcon /> : <EmptyCircleIcon />}
                  <ThemedText variant="h8" style={styles.receiptMonthText}>
                    {display}
                  </ThemedText>
                </View>
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
          amount="340 500 р."
          date={formatDateWithYear(contract.date)}
          labelStyle={{ color: COLORS.TextGreen }}
        />
        <PaymentRow
          label="К оплате:"
          amount={`${formatNumberRegex(_avgMonthlyPayment)} р.`}
          date={formatDateWithYear(contract.date)}
          style={styles.paymentRow}
          labelStyle={{ color: COLORS.TextRed }}
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
