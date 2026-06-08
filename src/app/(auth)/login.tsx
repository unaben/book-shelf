import { useAuthData } from "@/context/AuthContext";
import { useState } from "react";
import AuthScreen from "../../components/AuthScreen";

const LoginPage = () => {
  const { login } = useAuthData();
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (email: string, password: string) => {
    setLoading(true);
    try {
      await login(email, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreen mode="login" onSubmit={handleLoginSubmit} isLoading={loading} />
  );
};

export default LoginPage;
