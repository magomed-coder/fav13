import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Logo } from "@/components/Logo";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInput } from "@/components/ThemedInput";

import { COLORS } from "@/constants/theme";
import { useGlobalContext } from "@/context/global-provider";

import { userStorage } from "@/services/userService";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const CreateUserNamePage = () => {
  const [username, setUsername] = useState("");
  const [usernameFocused, setUsernameFocused] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { isLogged, setUser } = useGlobalContext();
  const router = useRouter();

  const handleSaveUserName = async () => {
    try {
      setIsLoading(true);
      await userStorage.saveUserName(username);

      setUser((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          userNameInDevice: username,
        };
      });
      if (isLogged) {
        router.replace("/(root)");
        setIsLoading(false);
      }
    } catch {
      Alert.alert("Ошибка", "Попробуйте ввести данные заново");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.BGWhite}
        style="dark"
        translucent={false}
      />

      <KeyboardAvoidingView
        style={styles.content}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.logoWrapper}>
          <Logo />
        </View>

        <ThemedInput
          label="Выбери себе имя"
          placeholder="John Wick"
          value={username}
          onChangeText={setUsername}
          isFocused={usernameFocused}
          onFocus={() => setUsernameFocused(true)}
          onBlur={() => setUsernameFocused(false)}
        />

        <ThemedButton
          label="Подтвердить"
          onPress={handleSaveUserName}
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
  },
  scrollContent: {
    height: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    gap: 10,
  },
  buttonContainer: {
    marginTop: 15,
  },
  logoWrapper: {
    alignItems: "center",
    marginBottom: 15,
  },
});

export default CreateUserNamePage;
