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

interface UserContextType {
  isLogged: boolean;
  splashScreenDone: boolean;
  user: UserData | null;
  loading: boolean;
  refetch: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  setsplashScreenDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
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
      console.warn("[UserProvider] Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const isLogged = !!user?.username;

  // console.log("user", user);

  return (
    <UserContext.Provider
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
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used within a UserProvider");
  return context;
};
