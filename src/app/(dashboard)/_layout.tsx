import BookContextProvider from "@/context/BookContext";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import ProtectDashboardRoute from "../../components/ProtectDashboardRoute";

const DashboardLayout = () => {
  const { theme } = useTheme();

  return (
    <ProtectDashboardRoute>
      <BookContextProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: theme.navBackground,
              borderTopWidth: 0,
              paddingTop: 10,
              height: 90,
            },
            tabBarActiveTintColor: theme.iconColorFocused,
            tabBarInactiveTintColor: theme.iconColor,
          }}
        >
          <Tabs.Screen
            name="books"
            options={{
              title: "Books",
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  size={24}
                  name={focused ? "book" : "book-outline"}
                  color={focused ? theme.iconColorFocused : theme.iconColor}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  size={24}
                  name={focused ? "person" : "person-outline"}
                  color={focused ? theme.iconColorFocused : theme.iconColor}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="create"
            options={{
              title: "Create",
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  size={24}
                  name={focused ? "create" : "create-outline"}
                  color={focused ? theme.iconColorFocused : theme.iconColor}
                />
              ),
            }}
          />
          <Tabs.Screen name="book/[id]" options={{ href: null }} />
        </Tabs>
      </BookContextProvider>
    </ProtectDashboardRoute>
  );
};

export default DashboardLayout;
