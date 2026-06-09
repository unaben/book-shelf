import { Color } from "@/constants/Color";
import { IBook, useBookData } from "@/context/BookContext";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type EditFormProps = {
  currentBook: IBook;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  isActionLoading: boolean
  setIsActionLoading: React.Dispatch<React.SetStateAction<boolean>>
};

const EditForm = ({
  currentBook,
  isEditing,
  setIsEditing,
  id,
  setIsActionLoading,
  isActionLoading
}: EditFormProps) => {
  const { theme, globalColors } = useTheme();
  const { updateBook } = useBookData();
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editDescription, setEditDescription] = useState("");
  

  const handleSaveChanges = async () => {
    if (!id || !editTitle.trim() || !editAuthor.trim()) return;
    try {
      setIsActionLoading(true);
      await updateBook(id, {
        title: editTitle.trim(),
        author: editAuthor.trim(),
        description: editDescription.trim(),
      });
      setIsEditing(false); // Return to display layout mode showing updated content
    } catch (error) {
      console.error(error);
    } finally {
      setIsActionLoading(false);
    }
  };

  // Synchronize input strings whenever currentBook transitions or sets
  useEffect(() => {
    if (currentBook) {
      setEditTitle(currentBook.title);
      setEditAuthor(currentBook.author);
      setEditDescription(currentBook.description || "");
    }
  }, [currentBook, isEditing]);
  return (
    <View style={styles.formContainer}>
      <Text style={[styles.inputLabel, { color: theme.iconColor }]}>
        Book Title
      </Text>
      <TextInput
        style={[
          styles.textInput,
          {
            backgroundColor: theme.uiBackground,
            color: theme.title,
            borderColor: theme.border || "rgba(0,0,0,0.1)",
          },
        ]}
        value={editTitle}
        onChangeText={setEditTitle}
        placeholder="Enter book title..."
        placeholderTextColor={theme.iconColor}
      />

      <Text style={[styles.inputLabel, { color: theme.iconColor }]}>
        Author
      </Text>
      <TextInput
        style={[
          styles.textInput,
          {
            backgroundColor: theme.uiBackground,
            color: theme.title,
            borderColor: theme.border || "rgba(0,0,0,0.1)",
          },
        ]}
        value={editAuthor}
        onChangeText={setEditAuthor}
        placeholder="Enter author name..."
        placeholderTextColor={theme.iconColor}
      />

      <Text style={[styles.inputLabel, { color: theme.iconColor }]}>
        Synopsis & Notes
      </Text>
      <TextInput
        style={[
          styles.textInput,
          styles.textAreaInput,
          {
            backgroundColor: theme.uiBackground,
            color: theme.title,
            borderColor: theme.border || "rgba(0,0,0,0.1)",
          },
        ]}
        value={editDescription}
        onChangeText={setEditDescription}
        placeholder="Enter synopsis details..."
        placeholderTextColor={theme.iconColor}
        multiline
        numberOfLines={5}
        textAlignVertical="top"
      />

      <View style={styles.actionButtonSpacer} />

      <TouchableOpacity
        style={[
          styles.primaryActionBtn,
          { backgroundColor: globalColors.primary },
          isActionLoading && styles.disabledButton,
        ]}
        onPress={handleSaveChanges}
        disabled={isActionLoading || !editTitle.trim() || !editAuthor.trim()}
      >
        {isActionLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.primaryActionBtnText}>Save Updates</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.cancelFormBtn,
          { borderColor: theme.border || "rgba(255,255,255,0.1)" },
        ]}
        onPress={() => setIsEditing(false)}
        disabled={isActionLoading}
      >
        <Text style={[styles.cancelFormBtnText, { color: theme.text }]}>
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditForm;

const styles = StyleSheet.create({
  formContainer: { width: "100%" },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: Color.spacing.sm,
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
function updateBook(
  id: any,
  arg1: { title: string; author: string; description: string }
) {
  throw new Error("Function not implemented.");
}
