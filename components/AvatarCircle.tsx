// src/components/AvatarCircle.tsx
import { COLORS, FONTS } from "@/constants/theme";
import { UserData } from "@/types";
import React from "react";
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

export interface UserAvatarProps {
  user: UserData | null;
  size?: number;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  textStyle?: StyleProp<TextStyle>;
  /** overrides the circle’s background color */
  circleColor?: string;
  /** overrides the initial’s text color */
  letterColor?: string;
  /** overrides the initial’s border сolor color */
  borderColor?: string;
}

export const AvatarCircle: React.FC<UserAvatarProps> = ({
  user,
  size = 34,
  style,
  imageStyle,
  textStyle,
  circleColor = COLORS.BGWhite,
  letterColor = COLORS.TextBlack,
  borderColor = COLORS.BorderLightGreen,
}) => {
  const radius = size / 2;
  const initial = user?.userNameInDevice?.trim().charAt(0).toUpperCase();

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: radius,
          backgroundColor: circleColor,
          borderColor: borderColor,
        },
        style,
      ]}
    >
      {user?.avatarUrl ? (
        <Image
          source={{ uri: user.avatarUrl }}
          style={[
            {
              width: size,
              height: size,
              borderRadius: radius,
            },
            imageStyle,
          ]}
        />
      ) : (
        <Text
          style={[
            styles.initial,
            { fontSize: size * 0.5 },
            textStyle,
            letterColor ? { color: letterColor } : {},
          ]}
        >
          {initial}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  initial: {
    color: COLORS.TextWhite,
    fontFamily: FONTS.InterSemiBold,
  },
});
