import React from "react";
import { Circle, Svg, SvgProps } from "react-native-svg";

export interface EmptyCircleIconProps extends Omit<SvgProps, "xmlns" | "fill"> {
  /** Цвет заливки круга */
  fillColor?: string;
}

/**
 * Пустая круглая иконка
 */
export const EmptyCircleIcon: React.FC<EmptyCircleIconProps> = ({
  width = 21,
  height = 20,
  viewBox = "0 0 21 20",
  fillColor = "#ECF7FF",
  ...rest
}) => (
  <Svg width={width} height={height} viewBox={viewBox} fill="none" {...rest}>
    <Circle cx="10.6875" cy="10" r="10" fill={fillColor} />
  </Svg>
);
