import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, Text, View } from "react-native";

const RenderEmptyState = () => {
  const { theme } = useTheme();
  return (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: theme.iconColor }]}>
        Your book shelf is currently empty.
      </Text>
    </View>
  );
};

export default RenderEmptyState;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  emptyText: { fontSize: 16, textAlign: "center" },
});
