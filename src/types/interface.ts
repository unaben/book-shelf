import { Models } from "react-native-appwrite";

export interface IUser {
  $id: string;
  email: string;
  name: string;
}

export interface IAuthContextState {
  user: IUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface IBook extends Models.Document {
  title: string;
  author: string;
  description: string;
  userId: string;
}

export type ICreateBookInput = Omit<IBook, keyof Models.Document | "userId">;

export type IBookContextState = {
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
