import React from "react";
import { Path, Svg, SvgProps } from "react-native-svg";

export interface LineIconProps extends Omit<SvgProps, "xmlns" | "fill"> {
  strokeColor?: string;
}

export const LineIcon: React.FC<LineIconProps> = ({
  width = 260,
  height = 1,
  viewBox = "0 0 260 1",
  strokeColor = "#979797",
  ...rest
}) => (
  <Svg width={width} height={height} viewBox="0 0 260 1" fill="none" {...rest}>
    <Path stroke={strokeColor} strokeWidth={0.4} d="M0 0.381787L260 0.381787" />
  </Svg>
);
