import { Color } from "@/constants/Color";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  listContent: { padding: Color.spacing.md, flexGrow: 1 },
});
