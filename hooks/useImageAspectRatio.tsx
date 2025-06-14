import { useMemo } from "react";
import { Image, ImageSourcePropType } from "react-native";

export const useImageAspectRatio = (source: ImageSourcePropType) => {
  return useMemo(() => {
    const { width, height } = Image.resolveAssetSource(source);
    return width && height ? width / height : 1;
  }, [source]);
};
