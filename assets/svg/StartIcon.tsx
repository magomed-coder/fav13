import React from "react";
import { Path, Svg, SvgProps } from "react-native-svg";

export interface StartIconProps extends Omit<SvgProps, "xmlns" | "fill"> {
  /** Цвет линии */
  fillColor?: string;
  /** Угол поворота в градусах по часовой стрелке */
  rotation?: number;
}

/**
 * Иконка звезды
 * */
export const StartIcon: React.FC<StartIconProps> = ({
  width = 9,
  height = 8,
  viewBox = "0 0 9 8",
  fillColor = "#fff",
  rotation = 0,
  ...rest
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 9 8" fill="none" {...rest}>
      <Path
        d="M4.5.462l.907 2.79H8.34L5.967 4.977l.907 2.79L4.5 6.043 2.126 7.767l.907-2.79L.659 3.252h2.934L4.5.462z"
        fill={fillColor}
      />
    </Svg>
  );
};
