import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Logo } from "@/components/Logo";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInput } from "@/components/ThemedInput";

import { ThemedText } from "@/components/ThemedText";
import { COLORS } from "@/constants/theme";

import { authService } from "@/services/authService";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useUserContext } from "@/context/user-provider";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { isLogged, user, loading, refetch } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isLogged) {
      if (!user?.userNameInDevice) {
        router.replace("/(root)/create-username");
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
          router.replace("/(root)/create-username");
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
      <StatusBar
        backgroundColor={COLORS.BGWhite}
        style="dark"
        translucent={false}
      />

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
