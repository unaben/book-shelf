import AuthScreen from "@/components/AuthScreen/AuthScreen";
import useAuth from "./hooks/useAuth";

const LoginPage = () => {
  const { handleLoginSubmit, loading } = useAuth();

  return (
    <AuthScreen mode="login" onSubmit={handleLoginSubmit} isLoading={loading} />
  );
};

export default LoginPage;
