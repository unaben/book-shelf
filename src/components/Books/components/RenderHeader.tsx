import { useTheme } from "@/hooks/useTheme";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const RenderHeader = ({
  isLoading,
  length,
}: {
  isLoading: boolean;
  length: number;
}) => {
  const { theme } = useTheme();
  return isLoading && length === 0 ? (
    <View style={styles.initialLoader}>
      <ActivityIndicator size="large" color={theme.title} />
    </View>
  ) : null;
};

export default RenderHeader;

const styles = StyleSheet.create({
  initialLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
});
