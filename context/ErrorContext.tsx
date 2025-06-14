// context/ErrorContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { setGlobalErrorRef } from "./globalErrorRef";

export const ErrorContext = createContext<{
  error: Error | null;
  setError: (error: Error | null) => void;
}>({
  error: null,
  setError: () => {},
});

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setGlobalErrorRef.set(setError);
  }, [setError]);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useGlobalError = () => useContext(ErrorContext);
