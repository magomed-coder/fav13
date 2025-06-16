import { Redirect, withLayoutContext } from "expo-router";

import SplashScreen, { SPLASH_DURATION_MS } from "@/components/SplashScreen";
import CustomDrawerContent from "@/navigation/CustomDrawerContent";

import { useEffect } from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUserContext } from "@/context/user-provider";

export default function AppLayout() {
  const { splashScreenDone, setsplashScreenDone, isLogged } = useUserContext();

  const insets = useSafeAreaInsets();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setsplashScreenDone(true);
    }, SPLASH_DURATION_MS);
    return () => clearTimeout(timeout);
  }, [setsplashScreenDone]);

  if (!splashScreenDone) {
    return <SplashScreen />;
  }

  if (!isLogged) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerPosition: "left",
          drawerStyle: {
            width: "100%",
            borderRadius: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,

            overflow: "hidden",

            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      />
    </GestureHandlerRootView>
  );
}
