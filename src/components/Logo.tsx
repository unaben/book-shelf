import Svg, { Circle, Path, SvgProps } from "react-native-svg";
import { Color } from "../constants/Color";

interface LogoProps extends SvgProps {
  size?: number;
  fillColor?: string;
}

export const Logo = ({ size = 80, fillColor, ...props }: LogoProps) => {
  const resolvedColor = fillColor ?? Color.primary;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      {...props}
    >
      <Circle cx="50" cy="50" r="45" stroke={resolvedColor} strokeWidth="4" />
      <Path
        d="M35 30 L65 50 L35 70 Z"
        fill={resolvedColor}
        stroke={resolvedColor}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Logo;
