import { useBookData } from "@/context/BookContext";
import { useEffect, useState } from "react";
import type { EditFormProps } from "../EditForm.types";

const useEditForm = (props: EditFormProps) => {
  const { currentBook, isEditing, setIsEditing, id, setIsActionLoading } =
    props;

  const { updateBook } = useBookData();
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleSaveChanges = async () => {
    if (!id || !editTitle.trim() || !editAuthor.trim()) return;
    try {
      setIsActionLoading(true);
      await updateBook(id, {
        title: editTitle.trim(),
        author: editAuthor.trim(),
        description: editDescription.trim(),
      });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsActionLoading(false);
    }
  };

  useEffect(() => {
    if (currentBook) {
      setEditTitle(currentBook.title);
      setEditAuthor(currentBook.author);
      setEditDescription(currentBook.description || "");
    }
  }, [currentBook, isEditing]);
  
  return {
    editAuthor,
    editTitle,
    setEditAuthor,
    setEditTitle,
    editDescription,
    setEditDescription,
    handleSaveChanges,
  };
};

export default useEditForm;
