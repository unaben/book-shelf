import { useBookData } from "@/context/BookContext";
import { useEffect, useState } from "react";

const useBookDetails = (id: string) => {
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

  return {
    currentBook,
    modalVisible,
    setModalVisible,
    screenLoading,
    setScreenLoading,
    isDeleting,
    setIsDeleting,
    isEditing,
    setIsEditing,
    isActionLoading,
    setIsActionLoading,
  };
};

export default useBookDetails;
