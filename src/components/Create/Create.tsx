import useHandleBack from "@/hooks/useHandleBack";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import {
    Keyboard,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../../components/CustomInput";
import { styles } from "./Create.styles";
import useCreate from "./hooks/useCreate";

const Create = () => {
  const { theme, globalColors } = useTheme();
  const handleBack = useHandleBack();
  const {
    handleCreateBook,
    errors,
    isSubmitting,
    title,
    setTitle,
    author,
    setAuthor,
    description,
    setDescription,
  } = useCreate();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView
        edges={["top"]}
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => handleBack()}
            accessibilityRole="button"
            accessibilityLabel="Go back to home"
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={theme.title} />
          </TouchableOpacity>

          <Text style={[styles.headerTitle, { color: theme.title }]}>
            Create
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.card, { backgroundColor: theme.navBackground }]}>
            <Text style={[styles.formTitle, { color: theme.title }]}>
              Add a new book
            </Text>

            <CustomInput
              label="Book Title"
              placeholder="e.g., The Great Gatsby"
              value={title}
              onChangeText={setTitle}
              error={errors.title}
            />

            <CustomInput
              label="Author"
              placeholder="e.g., F. Scott Fitzgerald"
              value={author}
              onChangeText={setAuthor}
              error={errors.author}
            />

            <CustomInput
              label="Description"
              placeholder="Brief plot overview or notes..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              style={[
                styles.textArea,
                {
                  backgroundColor: theme.uiBackground,
                  borderColor: theme.iconColor,
                  color: theme.text,
                },
              ]}
              error={errors.description}
            />

            <TouchableOpacity
              style={[
                styles.submitButton,
                { backgroundColor: globalColors.primary },
              ]}
              onPress={handleCreateBook}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? "Saving..." : "Create Book"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Create;
