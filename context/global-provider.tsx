import { authService } from "@/services/authService";
import { userStorage } from "@/services/userService";
import { UserData } from "@/types";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface GlobalContextType {
  isLogged: boolean;
  splashScreenDone: boolean;
  user: UserData | null;
  loading: boolean;
  refetch: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  setsplashScreenDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [splashScreenDone, setsplashScreenDone] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const savedUserName = await userStorage.getUserName();
      const currentUser = await authService.getUser();

      setUser({
        ...currentUser,
        userNameInDevice: savedUserName,
      });
    } catch (error) {
      setUser(null);
      console.warn("[GlobalProvider] Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchUser();
  };

  useEffect(() => {
    // console.log("fetchUser");
    fetchUser();
  }, []);

  const isLogged = !!user?.username;

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        user,
        setUser,
        loading,
        refetch,
        splashScreenDone,
        setsplashScreenDone,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  return context;
};
