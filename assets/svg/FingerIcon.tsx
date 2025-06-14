import React from "react";
import { Path, Svg, SvgProps } from "react-native-svg";

export interface FingerIconProps extends Omit<SvgProps, "xmlns" | "fill"> {
  /** Цвет линий и элементов */
  strokeColor?: string;
}

/**
 * Иконка пальца
 */
export const FingerIcon: React.FC<FingerIconProps> = ({
  width = 12,
  height = 13,
  viewBox = "0 0 12 13",
  strokeColor = "#0F3059",
  ...rest
}) => (
  <Svg width={width} height={height} viewBox="0 0 11 13" fill="none" {...rest}>
    <Path
      d="M2.24 4.108a2.989 2.989 0 015.976 0 .31.31 0 01-.618 0 2.37 2.37 0 10-4.74 0 .31.31 0 01-.619 0zm7.11 2.37c-.268 0-.53.081-.752.232a1.34 1.34 0 00-2.03-.844V4.108a1.34 1.34 0 00-2.68 0v4.483L3.5 7.968a1.34 1.34 0 00-2.319 1.346l1.511 2.577a.31.31 0 00.534-.311L1.717 9.004a.721.721 0 111.255-.713l.962 1.546a.31.31 0 00.572-.164V4.108a.721.721 0 111.443 0v3.504a.31.31 0 00.618 0v-.618a.721.721 0 111.443 0v1.03a.31.31 0 00.618 0v-.206a.721.721 0 111.443 0v1.855c0 1.14-.376 1.916-.38 1.923a.31.31 0 00.14.413.3.3 0 00.3-.011.309.309 0 00.114-.125c.018-.037.445-.905.445-2.2V7.818a1.339 1.339 0 00-1.34-1.34z"
      fill="#0F3059"
      stroke="#0F3059"
      strokeWidth={0.274811}
    />
  </Svg>
);
