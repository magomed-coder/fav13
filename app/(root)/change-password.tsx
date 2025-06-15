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

import { authService } from "@/services/authService";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [focusedFields, setFocusedFields] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const router = useRouter();

  const handleFocus = (field: string) => {
    setFocusedFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocusedFields((prev) => ({ ...prev, [field]: false }));
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("Ошибка", "Все поля обязательны для заполнения");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Ошибка", "Новые пароли не совпадают");
      return;
    }

    try {
      setIsLoading(true);
      await authService.changePassword(oldPassword, newPassword);

      Alert.alert("Успех", "Пароль успешно изменен");
      router.replace("/(root)");
    } catch (error: any) {
      console.error("Password change error:", error);
      Alert.alert(
        "Ошибка",
        error.response?.data?.detail || "Не удалось изменить пароль"
      );
    } finally {
      setIsLoading(false);
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
          label="Текущий пароль"
          placeholder="Введите текущий пароль"
          value={oldPassword}
          onChangeText={setOldPassword}
          secureTextEntry
          isFocused={focusedFields.oldPassword}
          onFocus={() => handleFocus("oldPassword")}
          onBlur={() => handleBlur("oldPassword")}
        />

        <ThemedInput
          label="Новый пароль"
          placeholder="Введите новый пароль"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          isFocused={focusedFields.newPassword}
          onFocus={() => handleFocus("newPassword")}
          onBlur={() => handleBlur("newPassword")}
        />

        <ThemedInput
          label="Подтвердите новый пароль"
          placeholder="Повторите новый пароль"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          isFocused={focusedFields.confirmPassword}
          onFocus={() => handleFocus("confirmPassword")}
          onBlur={() => handleBlur("confirmPassword")}
        />

        <ThemedButton
          label="Сменить пароль"
          onPress={handleChangePassword}
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
  content: {
    flex: 1,
    justifyContent: "center",
    gap: 15,
  },
  buttonContainer: {
    marginTop: 20,
  },
  logoWrapper: {
    alignItems: "center",
    marginBottom: 25,
  },
});

export default ChangePasswordPage;
