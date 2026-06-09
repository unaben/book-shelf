import { Color } from "@/constants/Color";
import { useBookData } from "@/context/BookContext";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../../components/CustomInput";

type BookFormErrors = {
  title?: string;
  author?: string;
  description?: string;
};

const Create = () => {
  const router = useRouter();
  const { theme, globalColors } = useTheme();
  const { createBook } = useBookData();

  // Form Fields State
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  // Local UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<BookFormErrors>({});

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const validateForm = () => {
    const validErrors: BookFormErrors = {};

    if (!title.trim()) {
      validErrors.title = "Book title is required.";
    }
    if (!author.trim()) {
      validErrors.author = "Author name is required.";
    }
    if (!description.trim()) {
      validErrors.description = "Description is required.";
    }

    setErrors(validErrors);
    return Object.keys(validErrors).length === 0;
  };

  const handleCreateBook = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Let Appwrite take care of the heavy lifting.
      // Realtime subscription handles adding the UI card seamlessly.
      // Execute the Appwrite database insertion via your context hook
      await createBook({
        title: title.trim(),
        author: author.trim(),
        description: description.trim(),
      });
      // Reset form states cleanly upon success
      setTitle("");
      setAuthor("");
      setDescription("");

      // Auto-navigate user to their book shelf view inside the tab cluster
      router.push("/(dashboard)/books");
    } catch (error) {
      // Errors are already handled visually with an Alert inside your context file
      console.error("Submission transaction interrupted:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView
        edges={["top"]}
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        {/* Header Navigation Bar */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={handleBack}
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

        {/* Dynamic Form Content Layout */}
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

const styles = StyleSheet.create({
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
