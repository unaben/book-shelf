import AuthScreen from "@/components/AuthScreen/AuthScreen";
import useAuth from "./hooks/useAuth";

const RegisterPage = () => {
  const { handleRegisterSubmit, loading } = useAuth();

  return (
    <AuthScreen
      mode="register"
      onSubmit={handleRegisterSubmit}
      isLoading={loading}
    />
  );
};

export default RegisterPage;
