import React, { createContext, useContext, useEffect, useState } from "react";

export const ErrorContext = createContext<{
  error: Error | null;
  setError: (error: Error | null) => void;
}>({
  error: null,
  setError: () => {},
});

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<Error | null>(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useGlobalError = () => useContext(ErrorContext);
