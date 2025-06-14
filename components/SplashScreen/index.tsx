// SplashScreen.js
import { COLORS } from "@/constants/theme";
import React, { useEffect } from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface ImageSet {
  autoUrl: any;
  middleBigCloud1Url: any;
  middleBigCloud2Url: any;
  middleBigCloud3Url: any;
  middleCloud1Url: any;
  middleCloud2Url: any;
  middleCloud3Url: any;
  middleCloud4Url: any;
  building1Url?: any;
  building2Url?: any;
  building3Url?: any;
  buildingUrl?: any;
  roadMarkings?: any;
  roadUrl: any;
  splashScreenUrl: any;
  topCloudUrl: any;
}

const IMAGES: Record<"light" | "dark", ImageSet> = {
  light: {
    autoUrl: require("./images/light/auto.png"),
    middleBigCloud1Url: require("./images/light/middle-big-cloud-1.png"),
    middleBigCloud2Url: require("./images/light/middle-big-cloud-2.png"),
    middleBigCloud3Url: require("./images/light/middle-big-cloud-3.png"),
    middleCloud1Url: require("./images/light/middle-cloud-1.png"),
    middleCloud2Url: require("./images/light/middle-cloud-2.png"),
    middleCloud3Url: require("./images/light/middle-cloud-3.png"),
    middleCloud4Url: require("./images/light/middle-cloud-4.png"),
    buildingUrl: require("./images/light/building.png"),
    roadUrl: require("./images/light/road.png"),
    roadMarkings: require("./images/light/road-markings.png"),
    splashScreenUrl: require("./images/light/splash-icon-light.png"),
    topCloudUrl: require("./images/light/top-cloud.png"),
  },
  dark: {
    autoUrl: require("./images/dark/auto.png"),
    middleBigCloud1Url: require("./images/dark/middle-big-cloud-1.png"),
    middleBigCloud2Url: require("./images/dark/middle-big-cloud-2.png"),
    middleBigCloud3Url: require("./images/dark/middle-big-cloud-3.png"),
    middleCloud1Url: require("./images/dark/middle-cloud-1.png"),
    middleCloud2Url: require("./images/dark/middle-cloud-2.png"),
    middleCloud3Url: require("./images/dark/middle-cloud-3.png"),
    middleCloud4Url: require("./images/dark/middle-cloud-4.png"),
    building1Url: require("./images/dark/building1.png"),
    building2Url: require("./images/dark/building2.png"),
    building3Url: require("./images/dark/building3.png"),
    roadUrl: require("./images/dark/road.png"),
    splashScreenUrl: require("./images/dark/splash-icon-light.png"),
    topCloudUrl: require("./images/dark/top-cloud.png"),
  },
};

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");
export const SPLASH_DURATION_MS = 2000;
const INITIAL_SPLASH_WIDTH = 165;
const FINAL_SPLASH_WIDTH = 223;

const targetScale = 1.1;

export default function SplashScreen() {
  const scheme = useColorScheme() || "light";
  const imgs = IMAGES[scheme];

  const isDarkMode = scheme === "dark";

  // Shared values for animations
  const carX = useSharedValue(0);
  const cloudX = useSharedValue(0);
  const splashWidth = useSharedValue(INITIAL_SPLASH_WIDTH);
  const b1Scale = useSharedValue(1);
  const b2Scale = useSharedValue(1);

  const roadScale = useSharedValue(1);
  const autoScale = useSharedValue(1);

  useEffect(() => {
    // Calculate distances
    const carDistance = WINDOW_WIDTH * 0.7 - WINDOW_WIDTH * 0.1;
    const cloudDistance = WINDOW_WIDTH * 0.1;

    // Animate clouds and car
    cloudX.value = withTiming(cloudDistance, {
      duration: SPLASH_DURATION_MS,
      easing: Easing.linear,
    });
    carX.value = withTiming(carDistance, {
      duration: SPLASH_DURATION_MS,
      easing: Easing.linear,
    });
    // Animate splash image width
    splashWidth.value = withTiming(FINAL_SPLASH_WIDTH, {
      duration: SPLASH_DURATION_MS,
      easing: Easing.linear,
    });

    // Animate buildings: first two grow, third shrinks
    b1Scale.value = withTiming(1.32, {
      duration: SPLASH_DURATION_MS,
      easing: Easing.linear,
    });
    b2Scale.value = withTiming(1.17, {
      duration: SPLASH_DURATION_MS,
      easing: Easing.linear,
    });

    roadScale.value = withTiming(targetScale, {
      duration: SPLASH_DURATION_MS,
      easing: Easing.linear,
    });
    autoScale.value = withTiming(targetScale, {
      duration: SPLASH_DURATION_MS,
      easing: Easing.linear,
    });
  }, [autoScale, b1Scale, b2Scale, carX, cloudX, roadScale, splashWidth]);

  // Animated styles
  const cloudStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: cloudX.value }],
  }));

  const splashStyle = useAnimatedStyle(() => ({
    width: splashWidth.value,
  }));

  const b1Style = useAnimatedStyle(() => ({
    transform: [{ scale: b1Scale.value }],
  }));
  const b2Style = useAnimatedStyle(() => ({
    transform: [{ scale: b2Scale.value }],
  }));

  const roadStyle = useAnimatedStyle(() => ({
    transform: [{ scale: roadScale.value }],
  }));

  const autoStyle = useAnimatedStyle(() => ({
    left: WINDOW_WIDTH * 0.15 + carX.value,
    transform: [
      {
        scale: Platform.OS === "ios" ? autoScale.value : autoScale.value * 1.2,
      },
    ],
  }));

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDarkMode
          ? { backgroundColor: COLORS.BGDarkBlue }
          : { backgroundColor: "rgba(145, 195, 238, 1)" },
      ]}
    >
      {/* Splash logo with animated width */}
      <Animated.Image
        source={imgs.splashScreenUrl}
        style={[styles.splashScreenImage, splashStyle]}
        resizeMode="contain"
      />

      {/* Clouds without animated style */}
      <Animated.Image source={imgs.topCloudUrl} style={[styles.topCloud]} />
      <Animated.Image
        source={imgs.middleBigCloud1Url}
        style={[styles.middleBigCloud1]}
      />
      <Animated.Image
        source={imgs.middleBigCloud2Url}
        style={[styles.middleBigCloud2]}
      />
      <Animated.Image
        source={imgs.middleBigCloud3Url}
        style={[styles.middleBigCloud3]}
      />

      {/* Clouds with animated style */}
      <Animated.Image
        source={imgs.middleCloud1Url}
        style={[styles.middleCloud1, cloudStyle]}
      />
      <Animated.Image
        source={imgs.middleCloud2Url}
        style={[styles.middleCloud2, cloudStyle]}
      />
      <Animated.Image
        source={imgs.middleCloud3Url}
        style={[styles.middleCloud3, cloudStyle]}
      />
      <Animated.Image
        source={imgs.middleCloud4Url}
        style={[styles.middleCloud4, cloudStyle]}
      />

      {/* Buildings positioned near road with own animated growth/shrink */}
      {isDarkMode ? (
        <>
          <Animated.Image
            source={imgs.building1Url}
            style={[styles.building1, b1Style]}
            resizeMode="contain"
          />
          <Animated.Image
            source={imgs.building2Url}
            style={[styles.building2, b2Style]}
            resizeMode="contain"
          />
          <Animated.Image
            source={imgs.building3Url}
            style={[styles.building3]}
            resizeMode="contain"
          />
        </>
      ) : (
        <>
          <Animated.Image
            source={imgs.buildingUrl}
            style={[styles.building, b2Style]}
            resizeMode="contain"
          />
          <Animated.Image
            source={imgs.roadMarkings}
            style={[styles.roadMarkings]}
            resizeMode="contain"
          />
        </>
      )}

      {/* Road static */}
      <Animated.Image
        source={imgs.roadUrl}
        style={styles.road}
        resizeMode="cover"
      />
      {/* Car with animated style */}

      <Animated.Image
        source={imgs.roadUrl}
        style={[styles.road, roadStyle]}
        resizeMode="cover"
      />

      {/* Car with animated position и scale */}
      <Animated.Image
        source={imgs.autoUrl}
        style={[styles.auto, autoStyle]}
        resizeMode="contain"
      />

      {/*  Фоновый блок (нижний слой) */}
      <View
        style={[
          styles.backgroundBlock,
          isDarkMode
            ? { backgroundColor: "rgba(35, 59, 80, 1)" }
            : { backgroundColor: "rgba(59, 99, 128, 1)" },
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BGDarkBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  splashScreenImage: {
    zIndex: 99,
  },
  topCloud: {
    position: "absolute",
    top: 0,
    left: 0,
    width: WINDOW_WIDTH,
    zIndex: 90,
  },
  middleBigCloud1: {
    position: "absolute",
    bottom: WINDOW_HEIGHT * 0.3,
    left: 0,
    width: WINDOW_WIDTH,
    zIndex: 10,
  },
  middleBigCloud2: {
    position: "absolute",
    bottom: WINDOW_HEIGHT * 0.3,
    right: 0,
    width: WINDOW_WIDTH,
    zIndex: 20,
  },
  middleBigCloud3: {
    position: "absolute",
    // bottom: WINDOW_HEIGHT * 0.26,
    bottom: WINDOW_HEIGHT * 0.29,
    left: 0,
    width: WINDOW_WIDTH,
    zIndex: 20,
  },
  middleCloud1: {
    position: "absolute",
    top: WINDOW_HEIGHT * 0.35,
    left: WINDOW_WIDTH * 0.08,
  },
  middleCloud2: {
    position: "absolute",
    top: WINDOW_HEIGHT * 0.25,
    left: WINDOW_WIDTH * 0.35,
  },
  middleCloud3: {
    position: "absolute",
    top: WINDOW_HEIGHT * 0.22,
    right: WINDOW_WIDTH * 0.15,
  },
  middleCloud4: {
    position: "absolute",
    top: WINDOW_HEIGHT * 0.38,
    right: WINDOW_WIDTH * 0.2,
  },
  building: {
    position: "absolute",
    bottom: WINDOW_HEIGHT * 0.245,
    left: WINDOW_WIDTH * 0.1,
    width: WINDOW_WIDTH * 0.8,
    zIndex: 99,
  },
  building1: {
    position: "absolute",
    bottom: WINDOW_HEIGHT * 0.24,
    left: WINDOW_WIDTH * 0.05,
    width: WINDOW_WIDTH * 0.9,
    zIndex: 99,
  },
  building2: {
    position: "absolute",
    bottom: WINDOW_HEIGHT * 0.25,
    left: WINDOW_WIDTH * 0.2,
    width: WINDOW_WIDTH * 0.6,
    zIndex: 95,
  },
  building3: {
    position: "absolute",
    bottom: WINDOW_HEIGHT * 0.25,
    left: 0,
    width: WINDOW_WIDTH,
    zIndex: 90,
  },
  road: {
    position: "absolute",
    bottom: WINDOW_HEIGHT * 0.18,
    width: WINDOW_WIDTH,
    zIndex: 90,
  },
  roadMarkings: {
    position: "absolute",
    left: 5,
    bottom: WINDOW_HEIGHT * 0.18 + 13,
    width: WINDOW_WIDTH - 10,
    zIndex: 91,
  },
  auto: {
    position: "absolute",
    bottom: WINDOW_HEIGHT * 0.195,
    zIndex: 95,
  },
  backgroundBlock: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: WINDOW_WIDTH, // 100% ширины экрана
    height: WINDOW_HEIGHT * 0.3, // 50% высоты экрана
    backgroundColor: "rgba(35, 59, 80, 1)",
    zIndex: 1,
  },
});
