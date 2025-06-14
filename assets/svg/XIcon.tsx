import React from "react";
import { Path, Svg, SvgProps } from "react-native-svg";

export interface DividerProps extends Omit<SvgProps, "xmlns" | "fill"> {
  /** Цвет линии */
  strokeColor?: string;
}

export const XIcon: React.FC<DividerProps> = ({
  width = 18,
  height = 18,
  viewBox = "0 0 18 18",
  strokeColor = "#979797",
  ...rest
}) => (
  <Svg width={width} height={height} viewBox={viewBox} fill="none" {...rest}>
    <Path d="M1 1L17 17" stroke={strokeColor} />
    <Path d="M17 1L1 17" stroke={strokeColor} />
  </Svg>
);
