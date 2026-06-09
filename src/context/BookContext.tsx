import { useAuthData } from "@/context/AuthContext";
import { useTheme } from "@/hooks/useTheme";
import { client, databases } from "@/lib/appwrite";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Alert, StyleSheet } from "react-native";
import { ID, Models, Permission, Query, Role } from "react-native-appwrite";
import Toast from "react-native-toast-message";

const DATABASE_ID = "6a21b8910021b8e2a221";
const COLLECTION_ID = "books";

export interface IBook extends Models.Document {
  title: string;
  author: string;
  description: string;
  userId: string;
}

export type ICreateBookInput = Omit<IBook, keyof Models.Document | "userId">;

type IBookContextState = {
  books: IBook[];
  currentBook: IBook | null;
  isLoading: boolean;
  fetchBooks: () => Promise<void>;
  fetchBookById: (id: string) => Promise<void>;
  createBook: (data: ICreateBookInput) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  updateBook: (
    documentId: string,
    data: Partial<ICreateBookInput>
  ) => Promise<void>;
};

const BookContext = createContext<IBookContextState | undefined>(undefined);

const BookContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();
  const { user } = useAuthData();
  const [books, setBooks] = useState<IBook[]>([]);
  const [currentBook, setCurrentBook] = useState<IBook | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await databases.listDocuments<IBook>(
        DATABASE_ID,
        COLLECTION_ID,
        user?.$id
          ? [Query.equal("userId", user.$id), Query.orderDesc("$createdAt")]
          : []
      );
      setBooks(response.documents);
    } catch (error) {
      console.error("fetchBooks failed:", error);
      Alert.alert("Error", "Could not load your books.");
    } finally {
      setIsLoading(false);
    }
  }, [user?.$id]);

  const fetchBookById = useCallback(async (id: string) => {
    if (!id) {
      Alert.alert("Error", "No book ID provided.");
      return;
    }
    try {
      const book = await databases.getDocument<IBook>(
        DATABASE_ID,
        COLLECTION_ID,
        id
      );
      setCurrentBook(book);
    } catch (error) {
      console.error("fetchBookById failed:", error);
      Alert.alert("Not Found", "This book could not be found.");
      throw error;
    }
  }, []);

  const createBook = useCallback(
    async (data: ICreateBookInput) => {
      if (!user?.$id) {
        Alert.alert("Unauthorized", "You must be logged in to add a book.");
        return;
      }
      try {
        await databases.createDocument<IBook>(
          DATABASE_ID,
          COLLECTION_ID,
          ID.unique(),
          { ...data, userId: user.$id },
          [
            Permission.read(Role.user(user.$id)),
            Permission.update(Role.user(user.$id)),
            Permission.delete(Role.user(user.$id)),
          ]
        );
        Toast.show({
          type: "success",
          text1: "Book added! 📚",
          text2: `"${data.title}" has been successfully added to your shelf.`,
          position: "bottom", // or 'top'
          visibilityTime: 3000,
        });
      } catch (error) {
        console.error("createBook failed:", error);
        Toast.show({
          type: "error",
          text1: `"${data.title}" was not added! 📚`,
          text2: `Failed to add the book. Please try again.`,
          position: "bottom", // or 'top'
          visibilityTime: 3000,
        });
        throw error;
      }
    },
    [user?.$id]
  );

  const deleteBook = useCallback(
    async (id: string) => {
      try {
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
        if (currentBook?.$id === id) setCurrentBook(null);
        Toast.show({
          type: "success",
          text1: "Book removed! 📚",
          text2: `Book id "${id}" has been successfully deleted.`,
          position: "bottom", // or 'top'
          visibilityTime: 3000,
        });
      } catch (error) {
        console.error("deleteBook failed:", error);
        Toast.show({
          type: "error",
          text1: `Unable to delete book id "${id}"! 📚`,
          text2: `Failed to delete the book. Please try again.`,
          position: "bottom", // or 'top'
          visibilityTime: 3000,
        });
        throw error;
      }
    },
    [currentBook?.$id]
  );

  const updateBook = useCallback(
    async (bookId: string, data: Partial<ICreateBookInput>) => {
      try {
        // Appwrite syntax to partially mutate an existing collection document record
        const updatedDoc = await databases.updateDocument<IBook>(
          DATABASE_ID,
          COLLECTION_ID,
          bookId,
          data
        );

        // Sync local state immediately for instant feedback

        if (currentBook?.$id === bookId) {
          setCurrentBook(updatedDoc);
        }
        Toast.show({
          type: "success",
          text1: "Book updated! 📚",
          text2: `Book id "${bookId}" has been successfully updated.`,
          position: "bottom", // or 'top'
          visibilityTime: 3000,
        });
      } catch (error) {
        console.error("updateBook transaction failed:", error);
        Toast.show({
          type: "error",
          text1: `Unable to update book id "${bookId}"! 📚`,
          text2: `Failed to update the book. Please try again.`,
          position: "bottom", // or 'top'
          visibilityTime: 3000,
        });
        throw error;
      }
    },
    [currentBook]
  );

  // Remember to expose 'updateBook' in your useBookData context return bundle!

  useEffect(() => {
    // 1. Explicitly type the unsubscribe callback
    let unsubscribe: (() => void) | undefined;

    const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`;

    if (user) {
      fetchBooks();

      // 2. Type cast or generic cast the response if Appwrite SDK supports it, or assert the payload
      unsubscribe = client.subscribe(channel, (response) => {
        // Assert payload explicitly as IBook to resolve the ts(2345) array mismatch
        const payload = response.payload as IBook;
        const events = response.events;

        if (events[0]?.includes("create")) {
          setBooks((prev) => [payload, ...prev]);
        }

        if (events[0]?.includes("delete")) {
          setBooks((prev) => prev.filter((book) => book.$id !== payload.$id));
        }

        if (events[0]?.includes("update")) {
          setBooks((prev) =>
            prev.map((book) => (book.$id === payload.$id ? payload : book))
          );
        }
      });
    } else {
      setBooks([]);
      setIsLoading(false);
    }

    // 3. Critically important: clean up subscription to prevent memory leaks
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, fetchBooks]);

  const value = useMemo(
    (): IBookContextState => ({
      books,
      currentBook,
      isLoading,
      createBook,
      deleteBook,
      fetchBookById,
      fetchBooks,
      updateBook,
    }),
    [
      books,
      currentBook,
      isLoading,
      createBook,
      deleteBook,
      fetchBookById,
      fetchBooks,
    ]
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BookContextProvider;

export const useBookData = (): IBookContextState => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBookData must be used within <BookContextProvider />");
  }
  return context;
};
