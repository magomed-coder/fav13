import images from "@/constants/images";
import React from "react";
import {
  Image,
  ImageStyle,
  Platform,
  StyleProp,
  StyleSheet,
} from "react-native";

const isWeb = Platform.OS === "web";

interface LogoProps {
  width?: number;
  style?: StyleProp<ImageStyle>;
}

export const Logo: React.FC<LogoProps> = ({ width = 84, style }) => {
  let logoAspectRatio;

  if (!isWeb) {
    const { width: logoWidth, height: logoHeight } = Image.resolveAssetSource(
      images.logo
    );

    logoAspectRatio = !isWeb ? logoWidth / logoHeight : 1;
  }

  return (
    <Image
      source={images.logo}
      style={[styles.logo, { width, aspectRatio: logoAspectRatio }, style]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    height: undefined,
    aspectRatio: 1,
  },
});
