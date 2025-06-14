import * as Application from "expo-application";
import { Alert, Platform } from "react-native";
import { setGlobalErrorRef } from "./../context/globalErrorRef";

export function registerGlobalHandler() {
  ErrorUtils.setGlobalHandler((error: any, isFatal?: boolean) => {
    console.error("Global error:", error);

    const report = {
      message: error?.message,
      stack: error?.stack,
      isFatal,
      appName: Application.applicationName,
      version: Application.nativeApplicationVersion,
      build: Application.nativeBuildVersion,
      platform: Platform.OS,
    };

    // Например, отправка на сервер
    // fetch('https://your-server.com/log', { method: 'POST', body: JSON.stringify(report) });

    // 👉 Кидаем ошибку в глобальный setError()
    const setError = setGlobalErrorRef.get();
    if (setError) {
      console.log("HELLO", error);
      setError(error);
    }

    if (isFatal) {
      Alert.alert("Фатальная ошибка", error.message);
    }
    if (error?.message) {
      Alert.alert("Ошибка", error?.message);
    }
  });
}
