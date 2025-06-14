import React from "react";
import { Path, Svg, SvgProps } from "react-native-svg";

export interface LocationProps
  extends Omit<SvgProps, "xmlns" | "stroke" | "fill"> {
  /** Цвет заливки */
  fillColor?: string;
}

/**
 * Иконка местоположения
 */
export const LocationIcon: React.FC<LocationProps> = ({
  width = 10,
  height = 12,
  viewBox = "0 0 10 12",
  fillColor = "#0F3059",
  ...rest
}) => (
  <Svg width={width} height={height} viewBox="0 0 10 12" fill="none" {...rest}>
    <Path
      d="M5 11.542L1.523 7.441a14.493 14.493 0 01-.144-.186 4.493 4.493 0 01-.913-2.72 4.534 4.534 0 019.069 0c0 .981-.32 1.936-.913 2.719v.001l-.143.184L5 11.542zM2.038 6.758s.096.127.118.154L5 10.268l2.849-3.36.115-.151c.485-.64.747-1.42.746-2.223a3.71 3.71 0 00-7.42 0 3.669 3.669 0 00.748 2.224z"
      fill="#0F3059"
    />
    <Path
      d="M7.062 6.595h-.825V3.298H3.764v3.297h-.825V3.298a.824.824 0 01.825-.825h2.473a.824.824 0 01.825.825v3.297z"
      fill="#0F3059"
    />
    <Path
      d="M4.588 5.771h.824v.824h-.824v-.824zm0-1.649h.824v.825h-.824v-.825z"
      fill="#0F3059"
    />
  </Svg>
);
