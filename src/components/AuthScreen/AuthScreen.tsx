import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomInput from "../CustomInput";
import { styles } from "./AuthScreen.styles";
import type { AuthScreenProps } from "./AuthScreen.types";
import useAuthScreen from "./hooks/useAuthScreen";

const AuthScreen: React.FC<AuthScreenProps> = (props) => {
  const { isLoading = false } = props;
  const router = useRouter();
  const { theme, globalColors } = useTheme();

  const {
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
  } = useAuthScreen(props);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            { backgroundColor: theme.background },
          ]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
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
                router.replace(isLogin ? "/register" : "/login");
              }}
            >
              <Text
                style={[
                  styles.switchButtonText,
                  { color: globalColors.primary },
                ]}
              >
                {isLogin
                  ? "Don't have an account? Register"
                  : "Already have an account? Login"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
