import { Color } from "@/constants/Color";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  formContainer: { width: "100%" },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginBottom: Color.spacing.sm,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: Color.borderRadius.md,
    paddingHorizontal: Color.spacing.md,
    height: 48,
    fontSize: 15,
    marginBottom: Color.spacing.md,
  },
  textAreaInput: {
    height: 110,
    paddingVertical: Color.spacing.sm,
    textAlignVertical: "top",
  },
  actionButtonSpacer: { height: Color.spacing.md },
  primaryActionBtn: {
    width: "100%",
    height: 48,
    borderRadius: Color.borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Color.spacing.sm,
  },
  primaryActionBtnText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
  cancelFormBtn: {
    width: "100%",
    height: 48,
    borderRadius: Color.borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  cancelFormBtnText: { fontSize: 16, fontWeight: "600" },

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
  deleteButtonText: { fontSize: 16, fontWeight: "bold" },
  disabledButton: { opacity: 0.5 },
});
