/*
  File: /src/components/HomePage/StatsSection.tsx
  Shows number of contracts and total funds paid
*/
import { ThemedText } from "@/components/ThemedText";
import { COLORS } from "@/constants/theme";
import { formatNumberRegex } from "@/lib/helpers";
import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  dealsCount: number | undefined;
  totalPaid: number | undefined;
}

const StatsSection: React.FC<Props> = ({ dealsCount = 0, totalPaid = 0 }) => (
  <View style={styles.container}>
    <View style={styles.item}>
      <ThemedText variant="h6" style={styles.value}>
        {dealsCount}
      </ThemedText>
      <ThemedText variant="h5" style={styles.label}>
        Сделок за все время
      </ThemedText>
    </View>
    <View style={styles.item}>
      <ThemedText variant="h6" style={styles.value}>
        {formatNumberRegex(totalPaid)}
      </ThemedText>
      <ThemedText variant="h5" style={styles.label}>
        Внесенные средства
      </ThemedText>
    </View>
  </View>
);

export default React.memo(StatsSection);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 10,
    paddingVertical: 5,
  },
  item: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.BGWhite,
    borderRadius: 10,
    paddingVertical: 5,
  },
  value: { textAlign: "center" },
  label: { textAlign: "center", color: COLORS.TextGreyMedium },
});
