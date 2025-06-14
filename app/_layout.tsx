import DebugPanel from "@/components/DebugPanel";
import GlobalErrorBoundary from "@/components/GlobalErrorBoundary";

import { ToastContainer } from "@/components/ToastContainer";
import { FONTS } from "@/constants/theme";
import { AppProvider } from "@/context/app-provider";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    [FONTS.InterSemiBold]: require("../assets/fonts/Inter_18pt-SemiBold.ttf"),
    [FONTS.MontserratMedium]: require("../assets/fonts/Montserrat-Medium.ttf"),
    [FONTS.MontserratRegular]: require("../assets/fonts/Montserrat-Regular.ttf"),
    [FONTS.MontserratSemiBold]: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    [FONTS.PoppinsMedium]: require("../assets/fonts/Poppins-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppProvider>
      <GlobalErrorBoundary>
        <Stack screenOptions={{ headerShown: false }} />
        <DebugPanel />
        <ToastContainer />
      </GlobalErrorBoundary>
    </AppProvider>
  );
}
