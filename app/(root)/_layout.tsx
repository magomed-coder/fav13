import { useGlobalContext } from "@/context/global-provider";
import { Redirect, withLayoutContext } from "expo-router";

import SplashScreen, { SPLASH_DURATION_MS } from "@/components/SplashScreen";
import CustomDrawerContent from "@/navigation/CustomDrawerContent";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import { useEffect } from "react";

// const { Navigator } = createDrawerNavigator();
// const Drawer = withLayoutContext(Navigator);

export default function AppLayout() {
  const { splashScreenDone, setsplashScreenDone, isLogged } =
    useGlobalContext();

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
    return <SplashScreen />;
  }

  return <SplashScreen />;
}
