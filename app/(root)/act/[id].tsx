import { ScreenHeader } from "@/components/ScreenHeader";
import { ThemedText } from "@/components/ThemedText";
import { useUserContext } from "@/context/user-provider";
import {
  ContractData,
  formatDateWithYear,
  formatNumberRegex,
  getContractData,
} from "@/lib/helpers";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import InfoDivider from "@/components/ui/InfoDivider";

const ActPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useUserContext();

  const [data, setData] = useState<ContractData>({
    contract: undefined,
    order: undefined,
    paymentcalendar: undefined,
    receipts: [],
  });

  useEffect(() => {
    if (user) {
      setData(getContractData(id, user));
    }
  }, [id, user]);

  const { contract, order, receipts, paymentcalendar } = data;

  const totalPaid =
    receipts.reduce((sum, { payment_amount }) => {
      const amount = parseFloat(payment_amount);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0) || 0;

  const totalDebt = paymentcalendar
    ? parseFloat(paymentcalendar.total_debt)
    : 0;

  const paidDiff = totalPaid - totalDebt;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader showBack />

        <ThemedText variant="m600.16" style={styles.mainTitle}>
          Акт сверки
        </ThemedText>
        <ThemedText variant="m600.14" style={styles.subTitle}>
          в руб. за весь период работы договор{"\n"}
          {contract?.name}
        </ThemedText>

        <InfoDivider
          left="Увеличение долга"
          right={`${formatNumberRegex(totalDebt)} руб.`}
          showDivider={false}
        />
        <InfoDivider
          left="Уменьшение долга"
          right={`${formatNumberRegex(totalPaid)} руб.`}
          showDivider={false}
        />
        <InfoDivider
          left="Долг контрагента перед нами на текущий момент"
          right={`${formatNumberRegex(paidDiff)} руб.`}
          showDivider={false}
        />

        <ThemedText variant="m600.14" style={styles.sectionTitle}>
          Изменение долга контрагента
        </ThemedText>

        <InfoDivider
          left="Документ"
          right={`увеличение/уменьшение`}
          showDivider={false}
        />

        {/* Поступления по квитанциям */}
        <View style={styles.receiptsList}>
          {receipts.map((r) => (
            <InfoDivider
              key={r.id}
              showDivider={false}
              left={`Поступление в кассу ${
                r.receipt_number
              } от ${formatDateWithYear(r.receipt_date)}`}
              right={`${formatNumberRegex(r.payment_amount)} руб.`}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActPage;
