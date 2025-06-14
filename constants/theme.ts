export const FONTS = {
  InterSemiBold: "Inter-SemiBold",
  MontserratMedium: "Montserrat-Medium",
  MontserratRegular: "Montserrat-Regular",
  MontserratSemiBold: "Montserrat-SemiBold",
  PoppinsMedium: "Poppins-Medium",
} as const;
// Thin 100
// ExtraLight 200
// Light 300
// Regular 400
// Medium 500
// SemiBold 600
// Bold 700
// ExtraBold 800
// Black 900
export type FontKey = keyof typeof FONTS;
export type FontValue = (typeof FONTS)[FontKey];

export const COLORS = {
  // === BG-цвета ===
  BGDarkBlue: "rgba(26, 46, 64, 1)",
  BGDeepBlue: "rgba(35, 59, 80, 1)",
  BGWhite: "rgba(255, 255, 255, 1)",
  BGLightBlue: "rgba(193, 223, 245, 1)",
  BGSlate: "rgba(229, 231, 237, 1)",
  BGGrey: "rgba(209, 211, 217, 1)",
  BGTransparentGrey: "rgba(209, 211, 217, 0.44)",
  BGRed: "rgba(239, 39, 61, 1)",
  BGLighterBlue: "rgba(236, 246, 255, 1)",

  // === цвета для текста ===
  TextRed: "rgba(255, 0, 0, 1)",
  TextGreen: "rgba(77, 172, 62, 1)",
  TextDark: "rgba(52, 52, 52, 1)",
  TextWhite: "rgba(255, 255, 255, 1)",
  TextGreyDark: "rgba(95, 95, 95, 1)",
  TextGreyMedium: "rgba(155, 155, 155, 1)",
  TextGrey: "rgba(167, 167, 167, 1)",
  TextGreyLight: "rgba(209, 211, 217, 1)",
  TextDeepBlue: "rgba(41, 71, 97, 1)",
  TextBlack: "rgba(0, 0, 0, 1)",
  TextBlue: "rgba(0, 108, 186, 1)",

  // === BORDER-цвета ===
  BorderDarkBlue: "rgba(26, 46, 64, 1)",
  BorderLightGrey: "rgba(236, 236, 236, 1)",
  BorderLightGreen: "rgba(165, 244, 153, 1)",
  BorderBlack: "rgba(0, 0, 0, 1)",
  BorderDeepBlue: "rgba(41, 71, 97, 1)",
  BorderTransparent: "transparent",

  // === цвета тени ===
  ShadowLight: "rgba(165, 165, 165, 0.23)",

  // === для градиента ===
  GradientStartLightGreen: "rgba(197, 255, 164, 1)",
  GradientEndGreen: "rgba(77, 172, 62, 1)",
} as const;

export type ColorKey = keyof typeof COLORS;
export type ColorValue = (typeof COLORS)[ColorKey];
