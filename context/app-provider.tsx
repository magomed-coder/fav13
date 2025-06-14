import React from "react";
import { DebugProvider } from "./debug-context";

import { ErrorProvider } from "./ErrorContext";
import { GlobalProvider } from "./global-provider";
import { ToastProvider } from "./toast-context";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorProvider>
      <GlobalProvider>
        <ToastProvider>
          <DebugProvider>{children}</DebugProvider>
        </ToastProvider>
      </GlobalProvider>
    </ErrorProvider>
  );
};
