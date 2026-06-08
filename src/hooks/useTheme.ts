import { useColorScheme } from "react-native";
import { Color } from "../constants/Color";

export function useTheme() {
  const colorScheme = useColorScheme();
  const currentScheme = colorScheme === "dark" ? "dark" : "light";

  return {
    theme: Color[currentScheme],
    isDark: currentScheme === "dark",
    currentScheme,
    globalColors: { primary: Color.primary, warning: Color.warning },
  };
}
