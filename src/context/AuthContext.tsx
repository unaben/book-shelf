import { useTheme } from "@/hooks/useTheme";
import { account } from "@/lib/appwrite";
import { useRouter } from "expo-router";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { AppwriteException, ID } from "react-native-appwrite";
import Toast from "react-native-toast-message";
import type { IAuthContextState, IUser } from "../types/interface";

const AuthContext = createContext<IAuthContextState | undefined>(undefined);

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const currentAccount = await account.get();
        setUser({
          $id: currentAccount.$id,
          email: currentAccount.email,
          name: currentAccount.name,
        });
      } catch {
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession({ email, password });

      const currentAccount = await account.get();
      setUser({
        email: currentAccount.email,
        $id: currentAccount.$id,
        name: currentAccount.name,
      });

      router.push("/");
    } catch (error) {
      const message =
        error instanceof AppwriteException
          ? error.message
          : "Invalid credentials. Please try again.";
      Alert.alert("Login Failed", message);
      throw error;
    }
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const userId = ID.unique();
      try {
        await account.create({ name, email, password, userId });
        Toast.show({
          type: "success",
          text1: "Account Created",
          text2: "Registration successful. Please log in.",
          position: "top",
          visibilityTime: 3000,
        });
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Registration Failed",
          text2: `Failed to create account. Please try again.`,
          position: "top",
          visibilityTime: 3000,
        });
        throw error;
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await account.deleteSession({ sessionId: "current" });
    } catch (error) {
      console.error("Logout execution failed: ", (error as Error).message);
    } finally {
      setUser(null);
      router.replace("/");
    }
  }, []);
  const value = useMemo(
    (): IAuthContextState => ({
      user,
      login,
      register,
      logout,
      isLoading,
    }),
    [user, login, register, logout, isLoading]
  );

  if (isLoading) {
    return (
      <View
        style={[styles.loadingContainer, { backgroundColor: theme.background }]}
      >
        <ActivityIndicator size="large" color={theme.text} />
      </View>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthContextProvider;

export const useAuthData = (): IAuthContextState => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthData must be used within <AuthContextProvider />");
  }

  return context;
};
