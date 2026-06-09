import { Color } from "@/constants/Color";
import { useAuthData } from "@/context/AuthContext";
import { useBookData } from "@/context/BookContext";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const router = useRouter();
  const { theme, globalColors } = useTheme();
  const { user, logout } = useAuthData();
  const { books, isLoading } = useBookData();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogoutPress = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to end your active session?",
      [
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
      ]
    );
  };

  const menuItems = [
    {
      icon: "information-circle-outline",
      title: "About BookShelf",
      route: "/about",
    },
    {
      icon: "mail-outline",
      title: "Contact Support & Feedback",
      route: "/contact",
    },
  ];

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Go back to home"
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.title} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.title }]}>Profile</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.profileHeaderCard,
            { backgroundColor: theme.navBackground },
          ]}
        >
          <View
            style={[
              styles.avatarBadge,
              { backgroundColor: globalColors?.primary || Color.primary },
            ]}
          >
            <Text style={styles.avatarText}>{getUserInitials()}</Text>
          </View>
          <Text style={[styles.userNameText, { color: theme.title }]}>
            {user?.name || "Anonymous Reader"}
          </Text>
          <Text style={[styles.userEmailText, { color: theme.text }]}>
            {user?.email || "No email bound"}
          </Text>
        </View>

        <Text style={[styles.blockLabel, { color: theme.iconColor }]}>
          Library Metrics
        </Text>
        <View
          style={[styles.metricsRow, { backgroundColor: theme.navBackground }]}
        >
          <View style={styles.metricColumn}>
            <Ionicons
              name="book-outline"
              size={24}
              color={globalColors?.primary || Color.primary}
            />
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color={theme.title}
                style={{ marginTop: Color.spacing.xs }}
              />
            ) : (
              <Text style={[styles.metricCount, { color: theme.title }]}>
                {books?.length || 0}
              </Text>
            )}
            <Text style={[styles.metricLabel, { color: theme.text }]}>
              Books on Shelf
            </Text>
          </View>
        </View>

        <Text style={[styles.blockLabel, { color: theme.iconColor }]}>
          Application Hub
        </Text>
        <View
          style={[
            styles.menuContainer,
            { backgroundColor: theme.navBackground },
          ]}
        >
          {menuItems.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.menuRow}
                onPress={() => router.push(item.route as any)}
                activeOpacity={0.7}
              >
                <View style={styles.menuLeftSection}>
                  <Ionicons
                    name={item.icon as any}
                    size={22}
                    color={theme.iconColor}
                  />
                  <Text style={[styles.menuTitleText, { color: theme.title }]}>
                    {item.title}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={theme.iconColor}
                />
              </TouchableOpacity>
              {index < menuItems.length - 1 && (
                <View
                  style={[
                    styles.menuDivider,
                    { backgroundColor: theme.uiBackground },
                  ]}
                />
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.logoutButton,
            { borderColor: globalColors?.warning || Color.warning },
          ]}
          onPress={handleLogoutPress}
          activeOpacity={0.8}
        >
          <Ionicons
            name="log-out-outline"
            size={20}
            color={globalColors?.warning || Color.warning}
          />
          <Text
            style={[
              styles.logoutButtonText,
              { color: globalColors?.warning || Color.warning },
            ]}
          >
            Sign Out Account
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Color.spacing.md,
    height: 56,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: Color.spacing.md,
    padding: Color.spacing.sm,
    zIndex: 10,
  },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  scrollContent: { padding: Color.spacing.md, paddingBottom: Color.spacing.xl },
  profileHeaderCard: {
    alignItems: "center",
    paddingVertical: Color.spacing.lg,
    paddingHorizontal: Color.spacing.md,
    borderRadius: Color.borderRadius.md * 2,
    marginBottom: Color.spacing.md,
    marginTop: Color.spacing.xs,
  },
  avatarBadge: {
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Color.spacing.md,
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  userNameText: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  userEmailText: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 4,
    textAlign: "center",
  },
  blockLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: 1.2,
    paddingLeft: 4,
    marginBottom: Color.spacing.sm,
    marginTop: Color.spacing.md,
  },
  metricsRow: {
    flexDirection: "row",
    paddingVertical: Color.spacing.lg,
    borderRadius: Color.borderRadius.md * 2,
    marginBottom: Color.spacing.md,
    justifyContent: "center",
  },
  metricColumn: { alignItems: "center", width: "100%" },
  metricCount: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: Color.spacing.xs,
  },
  metricLabel: { fontSize: 13, marginTop: 2, fontWeight: "500" },
  menuContainer: {
    borderRadius: Color.borderRadius.md * 2,
    paddingHorizontal: Color.spacing.md,
    marginBottom: Color.spacing.xl,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Color.spacing.md,
    height: 56,
  },
  menuLeftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: Color.spacing.md,
  },
  menuTitleText: { fontSize: 15, fontWeight: "600" },
  menuDivider: { height: 1, width: "100%" },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Color.spacing.xs,
    borderWidth: 1.5,
    borderRadius: Color.borderRadius.md,
    paddingVertical: Color.spacing.md,
    width: "100%",
  },
  logoutButtonText: { fontSize: 16, fontWeight: "bold" },
});
