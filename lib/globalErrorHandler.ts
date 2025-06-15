// import * as Application from "expo-application";
import { Alert, Platform } from "react-native";

export function registerGlobalHandler() {
  ErrorUtils.setGlobalHandler((error: any, isFatal?: boolean) => {
    console.error("Global error:", error);

    // const report = {
    //   message: error?.message,
    //   stack: error?.stack,
    //   isFatal,
    //   appName: Application.applicationName,
    //   version: Application.nativeApplicationVersion,
    //   build: Application.nativeBuildVersion,
    //   platform: Platform.OS,
    // };

    // Например, отправка на сервер
    // fetch('https://your-server.com/log', { method: 'POST', body: JSON.stringify(report) });

    if (isFatal) {
      Alert.alert("Фатальная ошибка", error.message);
    }
    if (error?.message) {
      Alert.alert("Ошибка", error?.message);
    }
  });
}
