import { COLORS, ColorKey, FONTS } from "@/constants/theme";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from "react-native";

export type ThemedTextProps = TextProps & {
  /** Цвет текста из палитры COLORS */
  color?: ColorKey;
  /** Формат: "m600.14" — Montserrat SemiBold 14px, либо "h1" */
  variant?: string;
  /** Дополнительные стили для текста */
  style?: StyleProp<TextStyle>;
};

// Типы
type FontFamilyCode = "m" | "i" | "p";
type FontWeight = 400 | 500 | 600;

const FONT_MAP: Record<FontFamilyCode, Partial<Record<FontWeight, string>>> = {
  m: {
    400: FONTS.MontserratRegular,
    500: FONTS.MontserratMedium,
    600: FONTS.MontserratSemiBold,
  },
  i: {
    600: FONTS.InterSemiBold,
  },
  p: {
    500: FONTS.PoppinsMedium,
  },
};

// Поддержка legacy-ключей
const LEGACY_VARIANTS: Record<string, string> = {
  h1: "m600.14",
  h2: "m600.12",
  h3: "m400.12",
  h4: "m600.16",
  h5: "m400.10",
  h6: "i600.18",
  h7: "m500.12",
  h8: "m400.7",
  h9: "m500.14",
  link: "m400.16",
};

function parseVariant(variant?: string): TextStyle | undefined {
  if (!variant) return undefined;

  // Поддержка legacy-пресетов
  const normalized = LEGACY_VARIANTS[variant] ?? variant;

  const match = normalized.match(/^([a-z])(\d{3})\.(\d{1,2})$/);
  if (!match) return undefined;

  const [, familyCode, weightStr, sizeStr] = match;
  const weight = parseInt(weightStr, 10) as FontWeight;
  const fontSize = parseInt(sizeStr, 10);
  const fontFamily = FONT_MAP[familyCode as FontFamilyCode]?.[weight];

  if (!fontFamily) return undefined;

  const textStyle: TextStyle = {
    fontSize,
    lineHeight: Math.round(fontSize * 1.5),
    fontFamily,
  };

  // Добавляем underline, если исходный variant был "link"
  if (variant === "link") {
    textStyle.textDecorationLine = "underline";
  }

  return textStyle;
}

export function ThemedText({
  color = "TextBlack",
  variant = "m600.14",
  style,
  ...rest
}: ThemedTextProps) {
  const textColor = COLORS[color];
  const variantStyle = parseVariant(variant);

  return (
    <Text
      style={[styles.default, variantStyle, { color: textColor }, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    width: "100%",
  },
});
