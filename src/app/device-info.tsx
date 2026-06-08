import * as Device from "expo-device";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function DeviceInfoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the device info screen</Text>
      <Text style={styles.subText}>Running on: {Platform.OS}</Text>
      <Text style={styles.subText}>
        Device Model: {Device.modelName?.toUpperCase()}
      </Text>
      <Text style={styles.subText}>Device Brand: {Device.brand}</Text>
      <Text style={styles.subText}>OS Version: {Device.osVersion}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    paddingTop: 60,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: 'center',
    textAlign: 'left'
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  subText: {
    fontSize: 14,
    color: "#a0a0b0",
    marginTop: 4,
    marginBottom: 4,
    textTransform: "capitalize",
  },
});
