import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Logo } from "@/components/Logo";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInput } from "@/components/ThemedInput";

import { ThemedText } from "@/components/ThemedText";
import { COLORS } from "@/constants/theme";
import { useGlobalContext } from "@/context/global-provider";

import { authService } from "@/services/authService";
import { useRouter } from "expo-router";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { isLogged, user, loading, refetch } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isLogged) {
      if (!user?.userNameInDevice) {
        // router.replace("/(root)/create-username");
        Alert.alert("useEffect /(root)/create-username");
      } else {
        router.replace("/");
      }
    }
  }, [loading, isLogged, user, router]);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const isLogged = await authService.login(username, password);

      if (isLogged) {
        await refetch();

        if (!user?.userNameInDevice) {
          // router.replace("/(root)/create-username");
          Alert.alert("handleLogin /(root)/create-username");
          setIsLoading(false);
          return;
        }

        router.replace("/");
        setIsLoading(false);
      }
    } catch {
      Alert.alert("Ошибка", "Попробуйте ввести данные заново");
      setIsLoading(false);
    }
  };

  // пока идёт авторизация или перенаправление — показываем «заглушку»
  if (loading || (!loading && isLogged)) {
    return <SafeAreaView style={styles.container} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.BGWhite} barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <Logo style={styles.logo} />

        <ThemedInput
          label="E-mail"
          placeholder="ivanov@mail.com"
          value={username}
          onChangeText={setUsername}
          isFocused={usernameFocused}
          onFocus={() => setUsernameFocused(true)}
          onBlur={() => setUsernameFocused(false)}
          containerStyle={styles.inputContainer}
        />

        <ThemedInput
          label="Password"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          isFocused={passwordFocused}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
          containerStyle={styles.inputContainer}
        />
        <ThemedText variant="h3" style={styles.infoText}>
          В случае, если Вы не знаете или забыли данные для входа в личный
          кабинет, обратитесь к вашему представителю компании «FAVORIT»
        </ThemedText>
        <ThemedButton
          label="Подтвердить"
          onPress={handleLogin}
          loading={isLoading}
          containerStyle={styles.buttonContainer}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BGWhite,
    flex: 1,
    paddingHorizontal: 16,
    color: COLORS.TextGreyDark,
  },
  scrollContent: {
    height: "100%",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  inputContainer: {},
  buttonContainer: {},
  logo: {
    marginBottom: 15,
  },

  infoText: { color: COLORS.TextGreyDark },
});

export default LoginPage;

// @react-native-async-storage/async-storage
// axios
// @react-navigation/drawer
//
// expo-linear-gradient
// react-native-svg
// react-native-vector-icons

// "dependencies": {
//     "@expo/vector-icons": "^14.1.0",
//     "@react-native-async-storage/async-storage": "2.1.2",
//     "@react-navigation/bottom-tabs": "^7.3.10",
//     "@react-navigation/drawer": "^7.4.1",
//     "@react-navigation/elements": "^2.3.8",
//     "@react-navigation/native": "^7.1.10",
//     "axios": "^1.9.0",
//     "date-fns": "^4.1.0",
//     "expo": "~53.0.9",
//     "expo-application": "~6.1.4",
//     "expo-blur": "~14.1.4",
//     "expo-constants": "~17.1.6",
//     "expo-font": "~13.3.1",
//     "expo-haptics": "~14.1.4",
//     "expo-image": "~2.1.7",
//     "expo-linear-gradient": "~14.1.5",
//     "expo-linking": "~7.1.5",
//     "expo-router": "~5.0.6",
//     "expo-splash-screen": "~0.30.8",
//     "expo-status-bar": "~2.2.3",
//     "expo-symbols": "~0.4.4",
//     "expo-system-ui": "~5.0.7",
//     "expo-web-browser": "~14.1.6",
//     "react": "19.0.0",
//     "react-dom": "19.0.0",
//     "react-native": "0.79.2",
//     "react-native-gesture-handler": "~2.24.0",
//     "react-native-reanimated": "~3.17.4",
//     "react-native-safe-area-context": "5.4.0",
//     "react-native-screens": "~4.10.0",
//     "react-native-svg": "15.11.2",
//     "react-native-vector-icons": "^10.2.0",
//     "react-native-web": "~0.20.0",
//     "react-native-webview": "13.13.5",
//     "sentry-expo": "~7.0.0"
//   },
//   "devDependencies": {
//     "@babel/core": "^7.25.2",
//     "@sentry/cli": "^2.46.0",
//     "@types/react": "~19.0.10",
//     "@types/react-native": "^0.73.0",
//     "eslint": "^9.25.0",
//     "eslint-config-expo": "~9.2.0",
//     "typescript": "~5.8.3"
//   },
