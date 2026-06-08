import { Color } from "@/constants/Color";
import { useAuthData } from "@/context/AuthContext";
import { useTheme } from "@/hooks/useTheme";
import { Link } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Logo from "../components/Logo";
import ThemedView from "../components/ThemedView";

export default function HomeScreen() {
  const { user, logout } = useAuthData();
  const { theme, globalColors } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <Logo size={110} style={styles.logoMargin} />
          <Text style={[styles.title, { color: theme.title }]}>
            Welcome Home
          </Text>
          {user && (
            <Text style={styles.userBadge}>
              Logged in as:{" "}
              <Text style={{ color: globalColors.primary, fontWeight: "600" }}>
                {user.email}
              </Text>
            </Text>
          )}
        </View>

        <View style={styles.menuContainer}>
          <Link href="/about" asChild>
            <TouchableOpacity
              style={StyleSheet.flatten([
                styles.menuLink,
                { backgroundColor: theme.navBackground },
              ])}
            >
              <Text style={[styles.linkText, { color: theme.title }]}>
                About the App
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/contact" asChild>
            <TouchableOpacity
              style={StyleSheet.flatten([
                styles.menuLink,
                { backgroundColor: theme.navBackground },
              ])}
            >
              <Text style={[styles.linkText, { color: theme.title }]}>
                Contact Us
              </Text>
            </TouchableOpacity>
          </Link>

          {user !== null && (
            <Link href="/(dashboard)/profile" asChild>
              <TouchableOpacity
                style={StyleSheet.flatten([
                  styles.menuLink,
                  { backgroundColor: theme.navBackground },
                ])}
              >
                <Text style={[styles.linkText, { color: theme.title }]}>
                  View Profile
                </Text>
              </TouchableOpacity>
            </Link>
          )}

          {user !== null && (
            <Link href="/device-info" asChild>
              <TouchableOpacity
                style={StyleSheet.flatten([
                  styles.menuLink,
                  { backgroundColor: theme.navBackground },
                ])}
              >
                <Text style={[styles.linkText, { color: theme.title }]}>
                  Device System Info
                </Text>
              </TouchableOpacity>
            </Link>
          )}

          <View style={styles.authDivider}>
            {user === null ? (
              <View style={styles.authButtonGroup}>
                <Link href="/login" asChild>
                  <TouchableOpacity
                    style={StyleSheet.flatten([
                      styles.authButton,
                      { backgroundColor: globalColors.primary },
                    ])}
                  >
                    <Text style={styles.authButtonText}>Sign In</Text>
                  </TouchableOpacity>
                </Link>

                <Link href="/register" asChild>
                  <TouchableOpacity
                    style={StyleSheet.flatten([
                      styles.authButton,
                      styles.registerOutline,
                      { borderColor: globalColors.primary },
                    ])}
                  >
                    <Text
                      style={[
                        styles.authButtonText,
                        { color: globalColors.primary },
                      ]}
                    >
                      Register
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            ) : (
              <TouchableOpacity
                style={StyleSheet.flatten([
                  styles.logoutButton,
                  { backgroundColor: globalColors.warning },
                ])}
                onPress={handleLogout}
                activeOpacity={0.8}
              >
                <Text style={styles.logoutButtonText}>Log Out</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Color.spacing.lg,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: Color.spacing.lg,
  },
  logoMargin: {
    marginBottom: Color.spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  userBadge: {
    fontSize: 14,
    color: "#a0a0b0",
    marginTop: Color.spacing.sm,
    textAlign: "center",
  },
  menuContainer: {
    width: "100%",
    maxWidth: 360,
    gap: Color.spacing.sm,
  },
  menuLink: {
    width: "100%",
    paddingVertical: Color.spacing.md,
    paddingHorizontal: Color.spacing.lg,
    borderRadius: Color.borderRadius.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  linkText: {
    fontSize: 16,
    fontWeight: "500",
  },
  authDivider: {
    marginTop: Color.spacing.md,
    paddingTop: Color.spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
  },
  authButtonGroup: {
    flexDirection: "row",
    gap: Color.spacing.sm,
    width: "100%",
  },
  authButton: {
    flex: 1,
    paddingVertical: Color.spacing.md,
    borderRadius: Color.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  registerOutline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
  },
  authButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    width: "100%",
    paddingVertical: Color.spacing.md,
    borderRadius: Color.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  logoutButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.3,
  },
});
