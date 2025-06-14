import React from "react";
import { Path, Svg, SvgProps } from "react-native-svg";

export interface DividerProps extends Omit<SvgProps, "xmlns" | "fill"> {
  strokeColor?: string;
}

export const DividerIcon: React.FC<DividerProps> = ({
  width = 30,
  height = 9,
  viewBox = "0 0 30 9",
  strokeColor = "rgb(26, 46, 64)",
  ...rest
}) => (
  <Svg width={width} height={height} viewBox={viewBox} {...rest}>
    <Path d="M29 1L1 1" stroke={strokeColor} strokeLinecap="round" />
    <Path d="M29 8H9" stroke={strokeColor} strokeLinecap="round" />
  </Svg>
);
