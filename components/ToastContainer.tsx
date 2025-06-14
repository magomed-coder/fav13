import { useToast } from "@/context/toast-context";
import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: number;
  type: ToastType;
  title?: string;
  message: string;
}

export const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  return (
    <View style={styles.wrapper}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </View>
  );
};

const ToastItem: React.FC<ToastMessage> = ({ type, title, message }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const backgroundColor = toastColors[type];

  return (
    <Animated.View
      style={[styles.toast, { backgroundColor, opacity: fadeAnim }]}
    >
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const toastColors = {
  success: "#22c55e",
  error: "#ef4444",
  warning: "#facc15",
  info: "#3b82f6",
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: "center",
  },
  toast: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontWeight: "bold",
    color: "white",
  },
  message: {
    color: "white",
    marginTop: 2,
  },
});
