import { useBookData } from "@/context/BookContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { BookFormErrors } from "../Create.types";

const useCreate = () => {
  const router = useRouter();

  const { createBook } = useBookData();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<BookFormErrors>({});

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
      await createBook({
        title: title.trim(),
        author: author.trim(),
        description: description.trim(),
      });
      setTitle("");
      setAuthor("");
      setDescription("");
      router.push("/(dashboard)/books");
    } catch (error) {
      console.error("Submission transaction interrupted:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleCreateBook,
    errors,
    isSubmitting,
    title,
    setTitle,
    author,
    setAuthor,
    description,
    setDescription,
  };
};

export default useCreate;
