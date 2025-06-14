import { Image, ImageSourcePropType } from "react-native";

export const getImageHeight = (
  image: ImageSourcePropType,
  screenWidth: number
) => {
  const { width, height } = Image.resolveAssetSource(image);
  return screenWidth / (width / height);
};
