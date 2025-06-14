// src/components/Box.tsx
import { COLORS } from "@/constants/theme";
import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

export interface BoxProps {
  children?: ReactNode;
  /** Любые стили будут применены к корневому View */
  style?: StyleProp<ViewStyle>;
}

export const ThemedView: React.FC<BoxProps> = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 15,
    backgroundColor: COLORS.BGDarkBlue,
  },
});
