import { Color } from "@/constants/Color";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AboutScreen = () => {
  const { theme, globalColors } = useTheme();

  const features = [
    {
      icon: "cloud-upload-outline",
      title: "Realtime Syncing",
      desc: "Instantly updates library indexes using Appwrite database listeners.",
    },
    {
      icon: "moon-outline",
      title: "Dynamic Themes",
      desc: "Adapts fluidly across premium light and dark system interfaces.",
    },
    {
      icon: "phone-portrait-outline",
      title: "Native First",
      desc: "Engineered with React Native and Expo Router for responsive navigation.",
    },
  ];

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.brandHero}>
          <View
            style={[styles.logoBadge, { backgroundColor: theme.uiBackground }]}
          >
            <Ionicons name="library" size={44} color={globalColors.primary} />
          </View>
          <Text style={[styles.appName, { color: theme.title }]}>
            BookShelf
          </Text>
          <Text style={[styles.appVersion, { color: theme.iconColor }]}>
            Version 1.0.0
          </Text>
        </View>

        <View
          style={[styles.contentCard, { backgroundColor: theme.navBackground }]}
        >
          <Text style={[styles.sectionTitle, { color: theme.title }]}>
            Our Purpose
          </Text>
          <Text style={[styles.bodyText, { color: theme.text }]}>
            BookShelf is a lightweight, cross-platform utility engineered for
            avid readers. It streamlines physical library coordination by
            providing decentralized collection updates, real-time sync states,
            and granular archive controls.
          </Text>
        </View>

        <Text style={[styles.blockLabel, { color: theme.iconColor }]}>
          Core Integration Architecture
        </Text>
        {features.map((item, index) => (
          <View
            key={index}
            style={[
              styles.featureItem,
              { backgroundColor: theme.navBackground },
            ]}
          >
            <View
              style={[
                styles.featureIconBox,
                { backgroundColor: theme.uiBackground },
              ]}
            >
              <Ionicons
                name={item.icon as any}
                size={22}
                color={globalColors.primary}
              />
            </View>
            <View style={styles.featureTextBox}>
              <Text style={[styles.featureTitle, { color: theme.title }]}>
                {item.title}
              </Text>
              <Text style={[styles.featureDesc, { color: theme.text }]}>
                {item.desc}
              </Text>
            </View>
          </View>
        ))}

        <View
          style={[
            styles.contentCard,
            {
              backgroundColor: theme.navBackground,
              marginTop: Color.spacing.sm,
            },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              { color: theme.title, marginBottom: Color.spacing.sm },
            ]}
          >
            Built With
          </Text>
          <Text style={[styles.techStackText, { color: theme.iconColor }]}>
            React Native • Expo Router • Appwrite BaaS • TypeScript
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: Color.spacing.md, paddingBottom: Color.spacing.xl },
  brandHero: { alignItems: "center", marginVertical: Color.spacing.xl },
  logoBadge: {
    width: 84,
    height: 84,
    borderRadius: 42,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Color.spacing.md,
  },
  appName: { fontSize: 28, fontWeight: "bold", letterSpacing: -0.5 },
  appVersion: { fontSize: 14, fontWeight: "500", marginTop: 2 },
  contentCard: {
    padding: Color.spacing.lg,
    borderRadius: Color.borderRadius.md * 2,
    marginBottom: Color.spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: Color.spacing.xs,
  },
  bodyText: { fontSize: 15, lineHeight: 22 },
  blockLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: 1,
    paddingLeft: 4,
    marginBottom: Color.spacing.sm,
    marginTop: Color.spacing.sm,
  },
  featureItem: {
    flexDirection: "row",
    padding: Color.spacing.md,
    borderRadius: Color.borderRadius.md * 2,
    marginBottom: Color.spacing.sm,
    alignItems: "center",
  },
  featureIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Color.spacing.md,
  },
  featureTextBox: { flex: 1 },
  featureTitle: { fontSize: 16, fontWeight: "bold" },
  featureDesc: { fontSize: 13, marginTop: 2, lineHeight: 18 },
  techStackText: { fontSize: 14, fontWeight: "600", textAlign: "center" },
});
