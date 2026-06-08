import { Color } from "@/constants/Color";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface CustomInputProps extends TextInputProps {
  label: string;
  error?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  secureTextEntry,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { theme, globalColors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.title }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.uiBackground,
            borderColor: theme.iconColor,
            color: theme.text,
          },
          isFocused && { borderColor: globalColors.primary },
          !!error && { borderColor: globalColors.warning },
        ]}
        placeholderTextColor={theme.iconColor}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={secureTextEntry}
        accessibilityLabel={label}
        accessibilityRole="text"
        {...props}
      />
      {!!error && (
        <Text
          style={[styles.errorText, { color: globalColors.warning }]}
          accessibilityRole="alert"
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: Color.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginBottom: Color.spacing.sm,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: Color.borderRadius.md,
    padding: Color.spacing.md,
    fontSize: 16,
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  errorText: {
    fontSize: 12,
    marginTop: Color.spacing.sm / 2,
  },
});
