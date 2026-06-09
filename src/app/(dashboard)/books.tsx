import { Color } from "@/constants/Color";
import { IBook, useBookData } from "@/context/BookContext";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Books = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { books, isLoading, fetchBooks } = useBookData();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const renderBookItem = ({ item }: { item: IBook }) => (
    <Pressable onPress={() => router.push(`/(dashboard)/book/${item.$id}`)}>
      <View style={[styles.bookCard, { backgroundColor: theme.navBackground }]}>
        <Text style={[styles.bookTitle, { color: theme.title }]}>
          {item.title}
        </Text>
        <Text style={[styles.bookAuthor, { color: theme.text }]}>
          by {item.author}
        </Text>
        {item.description ? (
          <Text
            style={[styles.bookDescription, { color: theme.text }]}
            numberOfLines={3}
          >
            {item.description}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: theme.iconColor }]}>
        Your book shelf is currently empty.
      </Text>
    </View>
  );

  const renderHeader = () =>
    isLoading && books.length === 0 ? (
      <View style={styles.initialLoader}>
        <ActivityIndicator size="large" color={theme.title} />
      </View>
    ) : null;

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Go back to home"
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.title} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.title }]}>Books</Text>
      </View>

      <FlatList
        data={books}
        keyExtractor={(item) => item.$id}
        renderItem={renderBookItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={!isLoading ? renderEmptyState : null}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchBooks}
            tintColor={theme.title}
            colors={[theme.title]}
          />
        }
      />
    </SafeAreaView>
  );
};

export default Books;

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  listContent: { padding: Color.spacing.md, flexGrow: 1 },
  initialLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  bookCard: {
    borderRadius: Color.borderRadius.md,
    padding: Color.spacing.md,
    marginBottom: Color.spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bookTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  bookAuthor: {
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "italic",
    marginBottom: Color.spacing.sm,
  },
  bookDescription: { fontSize: 14, lineHeight: 20 },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  emptyText: { fontSize: 16, textAlign: "center" },
});
