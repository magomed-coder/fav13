import React from "react";
import { Path, Svg, SvgProps } from "react-native-svg";

export interface ProjectProps
  extends Omit<SvgProps, "xmlns" | "stroke" | "fill"> {
  /** Цвет заливки */
  fillColor?: string;
}

export const ProjectIcon: React.FC<ProjectProps> = ({
  width = 10,
  height = 12,
  viewBox = "0 0 10 12",
  fillColor = "#0F3059",
  ...rest
}) => (
  <Svg width={width} height={height} viewBox="0 0 14 15" fill="none" {...rest}>
    <Path
      d="M3.985 4.284a.412.412 0 00-.412.412v4.122a.412.412 0 10.824 0V4.696a.412.412 0 00-.412-.412zm2.61 0a.412.412 0 00-.412.412V7.17a.412.412 0 00.825 0V4.696a.412.412 0 00-.412-.412zm2.2.412a.412.412 0 01.824 0v5.222a.412.412 0 01-.825 0V4.696z"
      fill="#0F3059"
    />
    <Path
      d="M2.061 2.086h9.069c.53 0 .961.43.961.961v9.07a.962.962 0 01-.961.961H2.06a.962.962 0 01-.962-.962V3.047c0-.53.431-.961.962-.961zm-.137.961v9.07c0 .075.061.137.137.137h9.069a.138.138 0 00.137-.138V3.047a.138.138 0 00-.137-.137H2.06a.137.137 0 00-.137.137z"
      fill="#0F3059"
    />
  </Svg>
);
