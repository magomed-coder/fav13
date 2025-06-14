import { StartIcon } from "@/assets/svg/StartIcon";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface StarsRatingProps {
  count?: number;
  style?: ViewStyle;
}

export const StarsRating: React.FC<StarsRatingProps> = ({
  count = 5,
  style,
}) => (
  <View style={[styles.ratingContainer, style]}>
    {Array.from({ length: count }, (_, idx) => (
      <StartIcon key={idx} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});
