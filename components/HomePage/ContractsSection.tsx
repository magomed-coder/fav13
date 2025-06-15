/*
  File: /src/components/HomePage/ContractsSection.tsx
  Renders a list of contract items
*/
import { ThemedText } from "@/components/ThemedText";
import { COLORS } from "@/constants/theme";
import { formatDateWithYear, getContractItemBgColor } from "@/lib/helpers";
import { Contract } from "@/types";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedView } from "../ThemedView";
interface Props {
  contracts: Contract[] | undefined;
}

const ContractsSection: React.FC<Props> = ({ contracts = [] }) => {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <ThemedText variant="h4" style={styles.title}>
        Ваши договора:
      </ThemedText>

      <View>
        {contracts.map((contract, index) => {
          const bgColor = getContractItemBgColor(index, contracts.length);

          return (
            <Pressable
              key={contract.id}
              onPress={() => {
                router.push(`/contract/${contract.id}`);
              }}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1.0 }]}
            >
              <ContractItem {...contract} bgColor={bgColor} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

interface ContractItemProps extends Contract {
  bgColor: string;
}

const ContractItem: React.FC<ContractItemProps> = ({
  number,
  date,
  name,
  bgColor,
}) => (
  // const residentialComplex = extractResidentialComplex(order?.nomenclature);
  <ThemedView style={[styles.contractItem, { backgroundColor: bgColor }]}>
    <ThemedText variant="h7" style={styles.contractBuildingName}>
      {name}
    </ThemedText>
    <View style={styles.contractDetailsContainer}>
      <View style={styles.textContainer}>
        <ThemedText variant="h5" style={styles.contractNumber}>
          Договор {number}
        </ThemedText>
      </View>

      <View style={styles.contractDivider} />

      <View style={styles.textContainer}>
        <ThemedText variant="h5" style={styles.contractDate}>
          От {formatDateWithYear(date)}
        </ThemedText>
      </View>
    </View>
  </ThemedView>
);

export default React.memo(ContractsSection);

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  title: {
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },

  contractItem: {
    // padding: 16,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: COLORS.BGLightBlue,
    // остальные стили контейнера
  },
  contractBuildingName: {
    marginBottom: 8,
    // стили для названия ЖК
  },
  contractDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // Добавляем промежуток между элементами
  },
  textContainer: {
    flexShrink: 1, // Предотвращает растягивание текстовых блоков
  },
  contractNumber: {
    // Стили только для текста, ширина по контенту
  },
  contractDate: {
    // Стили только для текста, ширина по контенту
  },
  contractDivider: {
    flexGrow: 1,
    borderBottomWidth: 0.5,
    borderColor: COLORS.BorderBlack, // или ваш цвет из темы
    marginTop: 7, // Вертикальные отступы при необходимости
  },
});
