import ConfirmModal from "@/components/ConfirmModal";
import EditForm from "@/components/EditForm";
import { Color } from "@/constants/Color";
import { useBookData } from "@/context/BookContext";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BookDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme, globalColors } = useTheme();
  const { currentBook, fetchBookById } = useBookData();
  const [modalVisible, setModalVisible] = useState(false);
  const [screenLoading, setScreenLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    const loadDocument = async () => {
      if (!id) return;
      try {
        setScreenLoading(true);
        await fetchBookById(id);
      } catch (error) {
        console.error("Error pulling book context record:", error);
      } finally {
        setScreenLoading(false);
      }
    };

    loadDocument();
  }, [id, fetchBookById]);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(dashboard)/books");
    }
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.leftHeaderButton}
          disabled={isActionLoading}
        >
          <Ionicons name="arrow-back" size={24} color={theme.title} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.title }]} numberOfLines={1}>
          {isEditing ? "Edit Book Settings" : "Book Details"}
        </Text>
        {currentBook && !isEditing && (
          <TouchableOpacity
            style={styles.rightHeaderButton}
            onPress={() => setIsEditing(true)}
            disabled={isActionLoading}
          >
            <Ionicons
              name="pencil-outline"
              size={24}
              color={globalColors.primary}
            />
          </TouchableOpacity>
        )}
      </View>

      {screenLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={globalColors.primary} />
        </View>
      ) : !currentBook ? (
        <View style={styles.centerContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={48}
            color={theme.iconColor}
          />
          <Text style={[styles.errorText, { color: theme.text }]}>
            We couldn't load the details for this book.
          </Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={[
              styles.detailsCard,
              { backgroundColor: theme.navBackground },
            ]}
          >
            {isEditing ? (
              <EditForm
                currentBook={currentBook}
                id={id}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                isActionLoading={isActionLoading}
                setIsActionLoading={setIsActionLoading}
              />
            ) : (
              <>
                <View
                  style={[
                    styles.iconBadge,
                    { backgroundColor: theme.uiBackground },
                  ]}
                >
                  <Ionicons
                    name="book"
                    size={36}
                    color={globalColors.primary}
                  />
                </View>

                <Text style={[styles.bookTitle, { color: theme.title }]}>
                  {currentBook.title}
                </Text>

                <Text style={[styles.bookAuthor, { color: theme.text }]}>
                  by {currentBook.author}
                </Text>

                <View
                  style={[
                    styles.divider,
                    { backgroundColor: theme.uiBackground },
                  ]}
                />

                <Text style={[styles.sectionLabel, { color: theme.iconColor }]}>
                  Synopsis & Notes
                </Text>

                <Text style={[styles.bookDescription, { color: theme.text }]}>
                  {currentBook.description ||
                    "No dynamic summary notes provided for this book entry."}
                </Text>

                <View
                  style={[
                    styles.divider,
                    {
                      backgroundColor: theme.uiBackground,
                      marginVertical: Color.spacing.lg,
                    },
                  ]}
                />

                <TouchableOpacity
                  style={[
                    styles.deleteButton,
                    { borderColor: globalColors.warning },
                    isDeleting && styles.disabledButton,
                  ]}
                  onPress={() => setModalVisible(true)}
                  disabled={isDeleting}
                  activeOpacity={0.7}
                >
                  {isDeleting ? (
                    <ActivityIndicator
                      size="small"
                      color={globalColors.warning}
                    />
                  ) : (
                    <>
                      <Ionicons
                        name="trash-outline"
                        size={20}
                        color={globalColors.warning}
                      />
                      <Text
                        style={[
                          styles.deleteButtonText,
                          { color: globalColors.warning },
                        ]}
                      >
                        Delete Book
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      )}
      <ConfirmModal
        id={id}
        setIsDeleting={setIsDeleting}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
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
