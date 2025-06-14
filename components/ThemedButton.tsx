import { COLORS } from "@/constants/theme";
import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface LoginButtonProps {
  label?: string;
  loading?: boolean;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const ThemedButton: React.FC<LoginButtonProps> = ({
  label = "Подтвердить",
  loading = false,
  onPress,
  containerStyle,
  contentStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, containerStyle, loading && styles.buttonDisabled]}
      onPress={onPress}
      disabled={loading}
    >
      <View style={[styles.content, contentStyle]}>
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.BGWhite} />
        ) : (
          <Text style={[styles.text, textStyle]}>{label}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.BGDarkBlue,
    borderRadius: 15,
    paddingVertical: 12,

    shadowRadius: 4,
    elevation: 3,
    width: "100%",

    shadowColor: COLORS.ShadowLight,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    color: COLORS.TextWhite,
    fontFamily: "Montserrat-Medium",
  },
});
