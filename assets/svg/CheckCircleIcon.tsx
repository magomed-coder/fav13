import React from "react";
import { Circle, Path, Svg, SvgProps } from "react-native-svg";

export interface CheckCircleIconProps extends Omit<SvgProps, "xmlns" | "fill"> {
  /** Цвет для контура и галочки */
  strokeColor?: string;
  /** Толщина обводки */
  strokeWidth?: number;
}

/**
 * Иконка: круг с галочкой
 */
export const CheckCircleIcon: React.FC<CheckCircleIconProps> = ({
  width = 21,
  height = 20,
  viewBox = "0 0 21 20",
  strokeColor = "#000000",
  strokeWidth = 1,
  ...rest
}) => (
  <Svg width={width} height={height} viewBox={viewBox} fill="none" {...rest}>
    <Circle
      cx="10.5"
      cy="10"
      r="9.5"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
    />
    <Path
      d="M5.5 9.28571L9.5 14L15.5 7"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </Svg>
);
