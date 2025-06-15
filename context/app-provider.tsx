import React from "react";
import { DebugProvider } from "./debug-context";

import { UserProvider } from "./user-provider";
import { ToastProvider } from "./toast-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ErrorProvider } from "./ErrorContext";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <ErrorProvider>
          <ToastProvider>
            <DebugProvider>{children}</DebugProvider>
          </ToastProvider>
        </ErrorProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
};
