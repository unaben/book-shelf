import { useState } from "react";
import { Keyboard } from "react-native";
import Toast from "react-native-toast-message";

const useContactScreen = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = () => {
    if (!email.trim() || !subject.trim() || !message.trim()) {
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
  return {
    handleSendMessage,
    email,
    setEmail,
    subject,
    setSubject,
    message,
    setMessage,
    isSending,
    setIsSending,
  };
};

export default useContactScreen;
