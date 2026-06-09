import type { IBook } from "@/types/interface";

export type EditFormProps = {
  currentBook: IBook;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  isActionLoading: boolean;
  setIsActionLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
