import { Color } from "@/constants/Color";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: Color.spacing.md,
    },
    card: {
      width: "100%",
      maxWidth: 400,
      borderRadius: Color.borderRadius.md * 2,
      padding: Color.spacing.lg,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: Color.spacing.lg,
      textAlign: "center",
    },
    submitButton: {
      padding: Color.spacing.md,
      borderRadius: Color.borderRadius.md,
      alignItems: "center",
      marginTop: Color.spacing.sm,
    },
    submitButtonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "bold",
    },
    switchButton: {
      marginTop: Color.spacing.md,
      alignItems: "center",
    },
    switchButtonText: {
      fontSize: 14,
      fontWeight: "500",
    },
  });