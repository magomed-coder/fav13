import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/theme";
import { ThemedText } from "./ThemedText";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

type Props = { children: React.ReactNode };

const GlobalErrorBoundary = ({ children }: Props) => {
  const router = useRouter();

  const [hasLocalError, setHasLocalError] = React.useState(false);

  const handleComponentError = () => {
    setHasLocalError(true);
  };

  const reset = () => {
    router.replace("/(root)");
    setHasLocalError(false);
    // Можно добавить логику перезагрузки приложения
  };

  if (hasLocalError) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.card}>
          <MaterialIcons
            name="error-outline"
            size={64}
            color={COLORS.TextRed}
            style={styles.icon}
          />
          <Text style={styles.title}>Что-то пошло не так</Text>
          <Text style={styles.subtitle}>Пожалуйста, попробуйте снова.</Text>

          <TouchableOpacity style={styles.buttonContainer} onPress={reset}>
            <ThemedText variant="m500.13" style={styles.buttonText}>
              Перезапустить
            </ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <ErrorBoundaryWrapper onError={handleComponentError}>
      {children}
    </ErrorBoundaryWrapper>
  );
};

class ErrorBoundaryWrapper extends React.Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.BGWhite,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: width * 0.9,
    backgroundColor: COLORS.BGSlate,
    borderRadius: 16,
    padding: 24,
    shadowColor: COLORS.ShadowLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    alignItems: "center",
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.TextBlack,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.TextBlack,
    marginBottom: 16,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    backgroundColor: COLORS.BGRed,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { color: COLORS.TextWhite, textAlign: "center" },
});

export default GlobalErrorBoundary;
