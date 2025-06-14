import React, { useCallback, useState } from "react";
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface IconButtonProps {
  /** Icon element to render inside the button */
  icon: React.ReactNode;
  /** Proportion of icon height to offset upward (0-1). Default centers icon: 0.5 */
  offsetPercent?: number;
  /** Style for the touchable wrapper */
  wrapperStyle?: StyleProp<ViewStyle>;
  /** Style for the inner container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Callback when pressing the icon button */
  onPress?: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  offsetPercent = 0.25,
  wrapperStyle,
  containerStyle,
  onPress,
}) => {
  const [iconHeight, setIconHeight] = useState(0);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setIconHeight(height);
  }, []);

  const translateY = -Math.round(iconHeight * offsetPercent);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.iconWrapper,
        { transform: [{ translateY }] },
        wrapperStyle,
      ]}
    >
      <View onLayout={onLayout} style={[styles.button, containerStyle]}>
        {icon}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  iconWrapper: {},
  button: {},
});
