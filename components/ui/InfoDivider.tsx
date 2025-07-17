import React from "react";
import { View, StyleSheet, StyleProp, TextStyle } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { COLORS } from "@/constants/theme";

interface InfoDividerProps {
  left: string;
  right: string;
  /** Общие стили для обоих текстовых блоков */
  textStyle?: StyleProp<TextStyle>;
  /** Индивидуальные стили для левого текста */
  leftTextStyle?: StyleProp<TextStyle>;
  /** Индивидуальные стили для правого текста */
  rightTextStyle?: StyleProp<TextStyle>;
  /** Показывать разделитель между текстами */
  showDivider?: boolean;
}

/**
 * Рендерит два текста слева и справа
 * с разделяющей пунктирной линией по центру.
 * Принимает общие и индивидуальные стили для текстов.
 */
const InfoDivider: React.FC<InfoDividerProps> = ({
  left,
  right,
  textStyle,
  leftTextStyle,
  rightTextStyle,
  showDivider = true,
}) => (
  <View style={styles.container}>
    <View style={styles.textContainer}>
      <ThemedText variant="m400.12" style={[textStyle, leftTextStyle]}>
        {left}
      </ThemedText>
    </View>
    <View
      style={[
        styles.divider,
        !showDivider && { borderColor: "transparent", marginHorizontal: 0 },
      ]}
    />
    <View style={[styles.textContainer, !showDivider && { width: "55%" }]}>
      <ThemedText
        variant="m400.12"
        style={[
          textStyle,
          rightTextStyle,
          !showDivider && { textAlign: "right" },
        ]}
      >
        {right}
      </ThemedText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  textContainer: {
    flexShrink: 1,
  },
  divider: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: "dashed",
    borderColor: COLORS.BorderBlack,
    marginHorizontal: 5,
    marginTop: 9,
  },
});

export default InfoDivider;
