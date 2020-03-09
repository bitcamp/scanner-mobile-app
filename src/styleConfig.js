/** Holds all app-wide styling configurations */

const pallete = {
  white: "white",
  black: "black",
  primary: "#1b2e34",
  disabled: "#777",
};

export const colors = {
  primary: pallete.primary,
  viewFinderMask: "rgba(0, 0, 0, 0.5)",
  viewFinderThroughHole: "transparent",
  viewFinderBorder: pallete.white,
  inputBorder: pallete.disabled,
  button: pallete.primary,
  ripple: "#999",
  background: pallete.white,
  lightText: pallete.white,
  darkText: pallete.black,
  disabled: pallete.disabled,
};

export const textStyles = {
  titleFont: "Aleo-Bold",
  bodyFont: "System",
  large: 30,
  medium: 18,
  body: 16,
};

export const baseStyles = {
  borderRadius: 5,
  borderWidth: 2,
  spacing: 20,
  iconSize: 30,
};
