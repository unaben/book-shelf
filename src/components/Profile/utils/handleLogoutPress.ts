import { ImperativeRouter } from "expo-router";
import { Alert } from "react-native";

export const handleLogoutPress = async (
  logout: () => Promise<void>,
  router: ImperativeRouter
) => {
  Alert.alert("Sign Out", "Are you sure you want to end your active session?", [
    { text: "Cancel", style: "cancel" },
    {
      text: "Log Out",
      style: "destructive",
      onPress: async () => {
        try {
          if (logout) {
            await logout();
            router.replace("/login");
          }
        } catch (error) {
          console.error("Logout transaction failed:", error);
          Alert.alert(
            "Error",
            "Failed to clear authentication session. Please try again."
          );
        }
      },
    },
  ]);
};
