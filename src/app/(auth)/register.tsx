import { useAuthData } from "@/context/AuthContext";
import { useState } from "react";
import AuthScreen from "../../components/AuthScreen";

const RegisterPage = () => {
  const { register } = useAuthData();
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = async (
    email: string,
    password: string,
    name = ""
  ) => {
    setLoading(true);
    try {
      await register(email, password, name);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreen
      mode="register"
      onSubmit={handleRegisterSubmit}
      isLoading={loading}
    />
  );
};

export default RegisterPage;
