import { createContext, useCallback, useContext, useState } from "react";
import { AUTH_SCREENS, type AuthScreen } from "./screens";

interface AuthContextType {
  email: string | null;
  activeScreen: AuthScreen;
  isInitialScreen: boolean;
  navigateToScreen: (screen: AuthScreen) => void;
  setEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const [activeScreen, setActiveScreen] = useState<AuthScreen>(
    AUTH_SCREENS.ENTER_EMAIL
  );

  const [isInitialScreen, setIsInitialScreen] = useState(true);

  const navigateToScreen = useCallback(
    (screen: AuthScreen) => {
      setActiveScreen(screen);

      if (isInitialScreen) {
        setIsInitialScreen(false);
      }
    },
    [isInitialScreen]
  );

  return (
    <AuthContext.Provider
      value={{
        activeScreen,
        email,
        isInitialScreen,
        navigateToScreen,
        setEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
