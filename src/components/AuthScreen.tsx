import { Color } from "@/constants/Color";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomInput from "./CustomInput";

interface AuthScreenProps {
  mode: "login" | "register";
  onSubmit: (email: string, password: string, name?: string) => Promise<void>;
  isLoading?: boolean;
}

const AuthScreen: React.FC<AuthScreenProps> = ({
  mode,
  onSubmit,
  isLoading = false,
}) => {
  const isLogin = mode === "login";
  const { theme, globalColors } = useTheme();
  const router = useRouter();
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { backgroundColor: theme.background },
        ]}
      >
        <View style={[styles.card, { backgroundColor: theme.navBackground }]}>
          <Text style={[styles.title, { color: theme.title }]}>
            {isLogin ? "Welcome Back" : "Create Account"}
          </Text>

          {!isLogin && (
            <CustomInput
              label="Full name"
              placeholder="Mario Brutal"
              value={name}
              onChangeText={setName}
              error={errors.name}
              autoCapitalize="none"
              editable={!isLoading}
            />
          )}

          <CustomInput
            label="Email Address"
            placeholder="email@example.com"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
          />

          <CustomInput
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            secureTextEntry
            autoCapitalize="none"
            editable={!isLoading}
          />

          {!isLogin && (
            <CustomInput
              label="Confirm Password"
              placeholder="••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              error={errors.confirmPassword}
              secureTextEntry
              autoCapitalize="none"
              editable={!isLoading}
            />
          )}

          <TouchableOpacity
            style={[
              styles.submitButton,
              {
                backgroundColor: globalColors.primary,
                opacity: isLoading ? 0.6 : 1,
              },
            ]}
            onPress={handleSubmit}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? "Processing..." : isLogin ? "Log In" : "Sign Up"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => {
              setErrors({});
              if (isLogin) {
                router.replace("/register");
              } else {
                router.replace("/login");
              }
            }}
          >
            <Text
              style={[styles.switchButtonText, { color: globalColors.primary }]}
            >
              {isLogin
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Color.spacing.md,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    borderRadius: Color.borderRadius.md * 2,
    padding: Color.spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: Color.spacing.lg,
    textAlign: "center",
  },
  submitButton: {
    padding: Color.spacing.md,
    borderRadius: Color.borderRadius.md,
    alignItems: "center",
    marginTop: Color.spacing.sm,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchButton: {
    marginTop: Color.spacing.md,
    alignItems: "center",
  },
  switchButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
