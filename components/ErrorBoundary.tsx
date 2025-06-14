import { COLORS } from "@/constants/theme";
import { type ErrorBoundaryProps } from "expo-router";
import { SafeAreaView, StatusBar, Text } from "react-native";

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar backgroundColor={COLORS.BGWhite} barStyle="dark-content" />
      <Text style={{ color: "white", fontSize: 18, marginBottom: 10 }}>
        {error.message}
      </Text>
      <Text style={{ color: "white", fontSize: 18, marginBottom: 10 }}>
        {error.message}
      </Text>
      <Text
        style={{ color: "white", textDecorationLine: "underline" }}
        onPress={retry}
      >
        Try Again?
      </Text>
    </SafeAreaView>
  );
}
