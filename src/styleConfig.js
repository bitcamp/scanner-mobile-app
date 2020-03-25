/* eslint-disable global-require */

/** Holds all app-wide styling configurations */

const pallete = {
  white: "white",
  black: "black",
  primary: "#1b2e34",
  disabled: "#777",
  error: "#f54242",
};

export const colors = {
  primary: pallete.primary,
  viewFinderMask: "rgba(0, 0, 0, 0.5)",
  invisible: "transparent",
  viewFinderBorder: pallete.white,
  inputBorder: pallete.disabled,
  button: pallete.primary,
  ripple: "#999",
  background: pallete.white,
  lightText: pallete.white,
  darkText: pallete.black,
  title: pallete.primary,
  disabled: pallete.disabled,
  error: pallete.error,
  headerBackground: pallete.primary,
  headerTint: pallete.white,
};

export const statusBarStyles = {
  backgroundColor: colors.headerBackground,
  barStyle: "light-content",
};

export const textStyles = {
  titleFont: "Aleo-Bold",
  bodyFont: "System",
  large: 30,
  medium: 18,
  body: 16,
  error: 12,
};

export const baseStyles = {
  borderRadius: 5,
  borderWidth: 2,
  spacing: 20,
  iconSize: 30,
  smallIconSize: 25,
};

export const toastOptions = {
  error: {
    containerStyle: {
      backgroundColor: colors.error,
      maxWidth: "80%",
    },
    textStyle: {
      fontFamily: textStyles.bodyFont,
      color: colors.lightText,
    },
  },
};

export const icons = {
  eventSelector: "chevron-down",
  logout: "logout",
  "Event Sign In": "account-check",
  "Check In": "qrcode-scan",
};

export const images = {
  headerLogo: {
    source: require("../assets/images/bitcamp-logo-mono-light.png"),
    aspectRatio: 2753 / 614, // This is needed to ensure responsive sizing in the header
  },
};
