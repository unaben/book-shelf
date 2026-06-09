import { Color } from "@/constants/Color";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  leftHeaderButton: {
    position: "absolute",
    left: Color.spacing.md,
    padding: Color.spacing.sm,
    zIndex: 10,
  },
  rightHeaderButton: {
    position: "absolute",
    right: Color.spacing.md,
    padding: Color.spacing.sm,
    zIndex: 10,
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    maxWidth: "70%",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Color.spacing.lg,
  },
  scrollContent: {
    padding: Color.spacing.md,
    flexGrow: 1,
  },
  detailsCard: {
    borderRadius: Color.borderRadius.md * 2,
    padding: Color.spacing.lg,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  iconBadge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Color.spacing.md,
    alignSelf: "center",
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },
  bookAuthor: {
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: Color.spacing.lg,
  },
  divider: {
    height: 1,
    width: "100%",
    marginVertical: Color.spacing.md,
  },
  sectionLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: Color.spacing.sm,
  },
  bookDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: Color.spacing.md,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Color.spacing.sm,
    borderWidth: 1.5,
    borderRadius: Color.borderRadius.md,
    paddingVertical: Color.spacing.md,
    width: "100%",
    marginTop: Color.spacing.sm,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.5,
  },
});
