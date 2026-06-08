import { StyleProp, useColorScheme, View, ViewProps, ViewStyle } from "react-native";
import { Color } from "../constants/Color";

type ThemedViewProps = {
    additionalStyles?: StyleProp<ViewStyle>;
  } & ViewProps

const ThemedView = ({ style, ...props }: ThemedViewProps) => {
  const colorScheme = useColorScheme();
  const currentScheme = colorScheme === "dark" ? "dark" : "light";
  const theme = Color[currentScheme as "light" | "dark"];
  return (
    <View
      style={[{ backgroundColor: theme.background }, style]}
      {...props}
    />
  );
};

export default ThemedView;
