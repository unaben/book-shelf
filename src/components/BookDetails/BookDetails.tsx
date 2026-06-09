import ConfirmModal from "@/components/ConfirmModal";
import EditForm from "@/components/EditForm/EditForm";
import { Color } from "@/constants/Color";
import useHandleBack from "@/hooks/useHandleBack";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./BookDetails.styles";
import useBookDetails from "./hooks/useBookDetails";

const BookDetails = () => {
  const { theme, globalColors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const handleBack = useHandleBack();
  const {
    currentBook,
    modalVisible,
    setModalVisible,
    screenLoading,
    isDeleting,
    setIsDeleting,
    isEditing,
    setIsEditing,
    isActionLoading,
    setIsActionLoading,
  } = useBookDetails(id);

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => handleBack("/(dashboard)/books")}
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
