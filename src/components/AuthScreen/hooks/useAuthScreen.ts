import { useState } from "react";
import { AuthScreenProps } from "../AuthScreen.types";

const useAuthScreen = (props: AuthScreenProps) => {
  const { mode, onSubmit } = props;
  const isLogin = mode === "login";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const validErrors: { [key: string]: string } = {};

    if (!isLogin && !name.trim()) {
      validErrors.name = "Please enter your full name.";
    }

    if (!email.includes("@")) {
      validErrors.email = "Please enter a valid email address.";
    }
    if (password.length < 8) {
      validErrors.password = "Password must be at least 8 characters.";
    }
    if (!isLogin && password !== confirmPassword) {
      validErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(validErrors);
    return Object.keys(validErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      if (isLogin) {
        await onSubmit(email.trim(), password);
      } else {
        await onSubmit(name.trim(), email.trim(), password);
      }
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.log("Authentication submission transaction rejected.");
    }
  };
  return {
    handleSubmit,
    isLogin,
    name,
    setName,
    errors,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    setErrors,
  };
};

export default useAuthScreen;
