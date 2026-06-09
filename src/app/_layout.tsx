import AuthContextProvider from "@/context/AuthContext";
import { useTheme } from "@/hooks/useTheme";
import { client } from "@/lib/appwrite";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  client.ping()
  const { theme } = useTheme();

  return (
    <AuthContextProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.title,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="about" options={{ title: "About" }} />
        <Stack.Screen name="contact" options={{ title: "Contact" }} />
        <Stack.Screen name="device-info" options={{ title: "Device info" }} />
      </Stack>
      <Toast />
    </AuthContextProvider>
  );
}
