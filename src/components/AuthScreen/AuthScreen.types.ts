export interface AuthScreenProps {
  mode: "login" | "register";
  onSubmit: (email: string, password: string, name?: string) => Promise<void>;
  isLoading?: boolean;
}
