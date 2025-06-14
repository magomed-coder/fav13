import React, { createContext, useContext, useState } from "react";

type DebugData = any;

interface DebugContextType {
  debugData: DebugData | null;
  setDebugData: (data: DebugData) => void;
  clearDebugData: () => void;
}

const DebugContext = createContext<DebugContextType | undefined>(undefined);

export const DebugProvider = ({ children }: { children: React.ReactNode }) => {
  const [debugData, setDebugDataState] = useState<DebugData | null>(null);

  const setDebugData = (data: DebugData) => setDebugDataState(data);
  const clearDebugData = () => setDebugDataState(null);

  return (
    <DebugContext.Provider value={{ debugData, setDebugData, clearDebugData }}>
      {children}
    </DebugContext.Provider>
  );
};

export const useDebug = () => {
  const context = useContext(DebugContext);
  if (!context) throw new Error("useDebug must be used within DebugProvider");
  return context;
};
