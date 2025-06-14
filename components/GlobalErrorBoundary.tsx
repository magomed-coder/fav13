import { useGlobalError } from "@/context/ErrorContext";
import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

type Props = { children: React.ReactNode };

const GlobalErrorBoundary = ({ children }: Props) => {
  const { error, setError } = useGlobalError();
  const [hasLocalError, setHasLocalError] = React.useState(false);
  const [localError, setLocalError] = React.useState<Error | null>(null);

  // Обработчик для ошибок в компонентах
  const handleComponentError = (error: Error) => {
    setLocalError(error);
    setHasLocalError(true);
    console.error("Component error:", error);
  };

  // Обработчик для глобальных ошибок
  React.useEffect(() => {
    if (error) {
      setLocalError(error);
      setHasLocalError(true);
    }
  }, [error]);

  const reset = () => {
    setError(null);
    setHasLocalError(false);
    setLocalError(null);
  };

  const errString = localError
    ? JSON.stringify(
        {
          Error: localError,
        },
        null,
        2
      )
    : "Неизвестная ошибка";

  if (hasLocalError) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <Text style={styles.text}>Произошла ошибка:</Text>
          <Text selectable style={styles.message}>
            {localError?.message || "Неизвестная ошибка"}
          </Text>
          <Text selectable style={styles.message}>
            {errString}
          </Text>
          <Button title="Перезагрузить" onPress={reset} />
        </ScrollView>
      </View>
    );
  }

  // Оборачиваем дочерние компоненты в обработчик ошибок
  return (
    <ErrorBoundaryWrapper onError={handleComponentError}>
      {children}
    </ErrorBoundaryWrapper>
  );
};

// Вспомогательный компонент для обработки ошибок в дочерних компонентах
class ErrorBoundaryWrapper extends React.Component<
  { children: React.ReactNode; onError: (error: Error) => void },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  render() {
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  scroll: { maxHeight: "50%", marginBottom: 20, width: "100%" },
  text: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  message: { color: "crimson", marginBottom: 20 },
});

export default GlobalErrorBoundary;
