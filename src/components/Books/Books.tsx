import { useBookData } from "@/context/BookContext";
import useHandleBack from "@/hooks/useHandleBack";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./Books.styles";
import RenderBookItem from "./components/RenderBookItem";
import RenderEmptyState from "./components/RenderEmptyState";
import RenderHeader from "./components/RenderHeader";

const Books = () => {
  const { theme } = useTheme();
  const { books, isLoading, fetchBooks } = useBookData();

  const handleBack = useHandleBack();

  return (
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
        <Text style={[styles.title, { color: theme.title }]}>Books</Text>
      </View>

      <FlatList
        data={books}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <RenderBookItem item={item} />}
        ListHeaderComponent={
          <RenderHeader isLoading={isLoading} length={books.length} />
        }
        ListEmptyComponent={!isLoading ? <RenderEmptyState /> : null}
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
