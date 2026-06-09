import { useTheme } from "@/hooks/useTheme";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./EditForm.styles";
import type { EditFormProps } from "./EditForm.types";
import useEditForm from "./hooks/useEditForm";

const fallBackBorderColor = "rgba(0,0,0,0.1)";

const EditForm = (props: EditFormProps) => {
  const { setIsEditing, isActionLoading } = props;
  const { theme, globalColors } = useTheme();

  const {
    editAuthor,
    editTitle,
    setEditAuthor,
    setEditTitle,
    editDescription,
    setEditDescription,
    handleSaveChanges,
  } = useEditForm(props);

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
            borderColor: theme.border || fallBackBorderColor,
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
            borderColor: theme.border || fallBackBorderColor,
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
            borderColor: theme.border || fallBackBorderColor,
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
