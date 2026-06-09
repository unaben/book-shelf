import { useAuthData } from "@/context/AuthContext";
import { useTheme } from "@/hooks/useTheme";
import { router } from "expo-router";
import { FC, PropsWithChildren, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const ProtectDashboardRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading, user } = useAuthData();
  const { theme } = useTheme();

  useEffect(() => {
    if (!isLoading && user === null) {
      router.replace("/");
    }
  }, [isLoading, user]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.title} />
      </View>
    );
  }

  return children;
};

export default ProtectDashboardRoute;
