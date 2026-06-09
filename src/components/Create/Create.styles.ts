import { Color } from "@/constants/Color";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Color.spacing.md,
  },
  card: {
    width: "100%",
    maxWidth: 450,
    borderRadius: Color.borderRadius.md * 2,
    padding: Color.spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: Color.spacing.lg,
    textAlign: "center",
  },
  textArea: {
    borderWidth: 1,
    borderRadius: Color.borderRadius.md,
    padding: Color.spacing.md,
    fontSize: 16,
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    padding: Color.spacing.md,
    borderRadius: Color.borderRadius.md,
    alignItems: "center",
    marginTop: Color.spacing.md,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
