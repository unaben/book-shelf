import { Color } from "@/constants/Color";
import { useAuthData } from "@/context/AuthContext";
import { useBookData } from "@/context/BookContext";
import useHandleBack from "@/hooks/useHandleBack";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./Profile.styles";
import { menuItems } from "./data";
import { getUserInitials } from "./utils/getUserInitials";
import { handleLogoutPress } from "./utils/handleLogoutPress";

const Profile = () => {
  const router = useRouter();
  const { theme, globalColors } = useTheme();
  const { user, logout } = useAuthData();
  const { books, isLoading } = useBookData();

  const handleBack = useHandleBack();

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => handleBack()}
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
            <Text style={styles.avatarText}>{getUserInitials(user)}</Text>
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
          onPress={() => handleLogoutPress(logout, router)}
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
