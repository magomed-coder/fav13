import React from "react";
import { Path, Svg, SvgProps } from "react-native-svg";

export interface ArrowProps extends Omit<SvgProps, "xmlns" | "fill"> {
  /** Цвет линии */
  strokeColor?: string;
  /** Угол поворота в градусах по часовой стрелке */
  rotation?: number;
}

/**
 * Иконка стрелки
 * */
export const ArrowIcon: React.FC<ArrowProps> = ({
  width = 12,
  height = 22,
  viewBox = "0 0 12 22",
  strokeColor = "rgba(26, 46, 64, 1)",
  rotation = 0,
  ...rest
}) => {
  const [minX, minY, vbWidth, vbHeight] = viewBox.split(" ").map(Number);
  const cx = minX + vbWidth / 2;
  const cy = minY + vbHeight / 2;
  const transform =
    rotation !== 0 ? `rotate(${rotation} ${0} ${0})` : undefined;

  return (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      transform={transform}
      {...rest}
    >
      <Path
        d="M0.582031 1.00317L10.8694 11.2911L0.582031 21.5785"
        stroke={strokeColor}
      />
    </Svg>
  );
};
