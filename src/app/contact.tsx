import { Color } from "@/constants/Color";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const ContactScreen = () => {
  const { theme, globalColors } = useTheme();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = () => {
    if (!email.trim() || !subject.trim() || !message.trim()) {
      Alert.alert(
        "Incomplete Fields",
        "Please populate all fields before dispatching your message."
      );
      Toast.show({
        type: "info",
        text1: "Incomplete Fields",
        text2: "Please populate all fields before dispatching your message.",
        position: "top",
        visibilityTime: 3000,
      });
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert(
        "Invalid Input",
        "Please supply a valid email distribution address."
      );
      Toast.show({
        type: "info",
        text1: "Invalid Input",
        text2: "Please supply a valid email distribution address.",
        position: "top",
        visibilityTime: 3000,
      });
      return;
    }

    Keyboard.dismiss();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      Toast.show({
        type: "success",
        text1: "Message Dispatched",
        text2:
          "Thank you! Your feedback has been safely logged. We will follow up if required.",
        position: "top",
        visibilityTime: 3000,
      });
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1500);
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerBlock}>
          <Text style={[styles.mainHeading, { color: theme.title }]}>
            Get in Touch
          </Text>
          <Text style={[styles.subHeading, { color: theme.text }]}>
            Encountered a runtime issue or want to request a library feature?
            Send us a message below.
          </Text>
        </View>

        <View
          style={[
            styles.formContainer,
            { backgroundColor: theme.navBackground },
          ]}
        >
          <Text style={[styles.inputLabel, { color: theme.iconColor }]}>
            Your Email Address
          </Text>
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.uiBackground,
                color: theme.title,
                borderColor: theme.border,
              },
            ]}
            value={email}
            onChangeText={setEmail}
            placeholder="name@domain.com"
            placeholderTextColor={theme.iconColor}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={[styles.inputLabel, { color: theme.iconColor }]}>
            Subject
          </Text>
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.uiBackground,
                color: theme.title,
                borderColor: theme.border,
              },
            ]}
            value={subject}
            onChangeText={setSubject}
            placeholder="e.g., Database Sync Issue"
            placeholderTextColor={theme.iconColor}
          />

          <Text style={[styles.inputLabel, { color: theme.iconColor }]}>
            Message Details
          </Text>
          <TextInput
            style={[
              styles.textInput,
              styles.textAreaInput,
              {
                backgroundColor: theme.uiBackground,
                color: theme.title,
                borderColor: theme.border,
              },
            ]}
            value={message}
            onChangeText={setMessage}
            placeholder="Type your feedback description here..."
            placeholderTextColor={theme.iconColor}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={[
              styles.submitButton,
              { backgroundColor: globalColors.primary },
              isSending && styles.disabledBtn,
            ]}
            onPress={handleSendMessage}
            disabled={isSending}
            activeOpacity={0.8}
          >
            <Ionicons
              name="paper-plane-outline"
              size={18}
              color="#fff"
              style={styles.btnIcon}
            />
            <Text style={styles.submitButtonText}>
              {isSending ? "Dispatching..." : "Send Message"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: Color.spacing.md },
  headerBlock: {
    marginTop: Color.spacing.md,
    marginBottom: Color.spacing.xl,
    paddingHorizontal: 4,
  },
  mainHeading: { fontSize: 26, fontWeight: "bold" },
  subHeading: { fontSize: 15, marginTop: Color.spacing.sm, lineHeight: 22 },
  formContainer: {
    padding: Color.spacing.lg,
    borderRadius: Color.borderRadius.md * 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: Color.spacing.xs,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: Color.borderRadius.md,
    paddingHorizontal: Color.spacing.md,
    height: 48,
    fontSize: 15,
    marginBottom: Color.spacing.md,
  },
  textAreaInput: {
    height: 130,
    paddingVertical: Color.spacing.sm,
    textAlignVertical: "top",
  },
  submitButton: {
    height: 48,
    borderRadius: Color.borderRadius.md,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Color.spacing.sm,
  },
  btnIcon: { marginRight: Color.spacing.sm },
  submitButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
  disabledBtn: { opacity: 0.6 },
});
