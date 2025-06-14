import React from "react";
import { Path, Svg, SvgProps } from "react-native-svg";

export interface CalculatorProps extends Omit<SvgProps, "xmlns" | "fill"> {
  /** Цвет линий и элементов */
  strokeColor?: string;
}

/**
 * Иконка калькулятора
 */
export const CalculatorIcon: React.FC<CalculatorProps> = ({
  width = 12,
  height = 13,
  viewBox = "0 0 12 13",
  strokeColor = "#0F3059",
  ...rest
}) => (
  <Svg width={width} height={height} viewBox={viewBox} fill="none" {...rest}>
    <Path
      d="M2.42758 1.54962V4.29773M3.80163 2.92367H1.05353M3.80163 8.69469L2.70239 9.79394M2.70239 9.79394L1.60315 10.8932M2.70239 9.79394L3.80163 10.8932M2.70239 9.79394L1.60315 8.69469M10.3971 3.19848H8.1986M10.3971 10.0687H8.1986M10.3971 8.41988H8.1986M11.4963 6.49621H0.503906M6.00012 11.9924V1"
      stroke={strokeColor}
      strokeWidth={0.824432}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
