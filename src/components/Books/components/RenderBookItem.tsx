import { Color } from "@/constants/Color";
import { useTheme } from "@/hooks/useTheme";
import type { IBook } from "@/types/interface";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const RenderBookItem = ({ item }: { item: IBook }) => {
  const router = useRouter();
  const { theme } = useTheme();
  return (
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
};

export default RenderBookItem;

const styles = StyleSheet.create({
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
});
