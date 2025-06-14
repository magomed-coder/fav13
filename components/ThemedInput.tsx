import { COLORS, FONTS } from "@/constants/theme";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface ThemedInputProps extends TextInputProps {
  label?: string;
  isFocused?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

export const ThemedInput: React.FC<ThemedInputProps> = ({
  value,
  onChangeText,
  placeholder = "",
  label = "",
  secureTextEntry = false,
  isFocused = false,
  onFocus,
  onBlur,
  containerStyle,
  labelStyle,
  inputContainerStyle,
  inputStyle,
  placeholderTextColor = COLORS.TextGreyLight,
  ...rest
}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}

      <View
        style={[
          styles.container,
          inputContainerStyle,
          isFocused && styles.focused,
        ]}
      >
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={onFocus}
          onBlur={onBlur}
          {...rest}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { width: "100%", gap: 7 },
  label: {
    fontSize: 12,
    color: COLORS.TextGrey,
    fontFamily: FONTS.MontserratSemiBold,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.BorderLightGrey,

    borderRadius: 14,
    overflow: "hidden",
  },
  focused: {
    borderColor: COLORS.BorderDarkBlue,
    shadowColor: COLORS.ShadowLight,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: "100%",
    fontFamily: FONTS.PoppinsMedium,
    fontSize: 14,
    color: COLORS.TextDark,
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 11,
  },
});
