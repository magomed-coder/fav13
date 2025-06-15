import React from "react";
import { DebugProvider } from "./debug-context";

import { GlobalProvider } from "./global-provider";
import { ToastProvider } from "./toast-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ErrorProvider } from "./ErrorContext";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaProvider>
      <GlobalProvider>
        <ErrorProvider>
          <ToastProvider>
            <DebugProvider>{children}</DebugProvider>
          </ToastProvider>
        </ErrorProvider>
      </GlobalProvider>
    </SafeAreaProvider>
  );
};
