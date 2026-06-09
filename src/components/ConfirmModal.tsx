import { Color } from "@/constants/Color";
import { useBookData } from "@/context/BookContext";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ConfirmModalProps = {
  id: string;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConfirmModal = ({
  id,
  setIsDeleting,
  modalVisible,
  setModalVisible,
}: ConfirmModalProps) => {

  const router = useRouter();
  const { currentBook, deleteBook } = useBookData();

  const { theme, globalColors } = useTheme();

  const confirmDelete = async () => {
    if (!id) return;
    setModalVisible(false); // Close modal overlay
    try {
      setIsDeleting(true);
      await deleteBook(id);

      // Navigate back immediately on deletion success
      router.replace("/(dashboard)/books");
    } catch (error) {
      console.error("Transaction failed during delete request:", error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.navBackground },
          ]}
        >
          <View
            style={[
              styles.modalIconBadge,
              { backgroundColor: "rgba(239, 68, 68, 0.1)" },
            ]}
          >
            <Ionicons
              name="warning-outline"
              size={32}
              color={globalColors.warning}
            />
          </View>

          <Text style={[styles.modalTitle, { color: theme.title }]}>
            Delete Book
          </Text>

          <Text style={[styles.modalDescription, { color: theme.text }]}>
            Are you sure you want to remove{" "}
            <Text style={{ fontWeight: "bold" }}>"{currentBook?.title}"</Text>{" "}
            from your shelf? This process cannot be undone.
          </Text>

          <View style={styles.modalActionGroup}>
            <TouchableOpacity
              style={[
                styles.modalBtn,
                styles.cancelBtn,
                { backgroundColor: theme.uiBackground },
              ]}
              onPress={() => setModalVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={[styles.cancelBtnText, { color: theme.text }]}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modalBtn,
                styles.confirmBtn,
                { backgroundColor: globalColors.warning },
              ]}
              onPress={confirmDelete}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmBtnText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: Color.spacing.lg,
  },
  modalContent: {
    width: "100%",
    maxWidth: 340,
    borderRadius: Color.borderRadius.md * 2,
    padding: Color.spacing.lg,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  modalIconBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Color.spacing.md,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: Color.spacing.sm,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: Color.spacing.lg,
  },
  modalActionGroup: {
    flexDirection: "row",
    gap: Color.spacing.md,
    width: "100%",
  },
  modalBtn: {
    flex: 1,
    paddingVertical: Color.spacing.md,
    borderRadius: Color.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    height: 58,
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  cancelBtnText: {
    fontSize: 16,
    fontWeight: "600",
  },
  confirmBtn: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  confirmBtnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
