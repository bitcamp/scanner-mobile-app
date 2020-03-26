/* eslint-disable global-require */

/** Holds all app-wide styling configurations */

const pallete = {
  white: "white",
  black: "black",
  primary: "#1b2e34",
  disabled: "#777",
  cancel: "#aaa",
  error: "#f54242",
  success: "#14c443",
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
  cancel: pallete.cancel,
  error: pallete.error,
  success: pallete.success,
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

const toastDefaultTextStyle = {
  fontFamily: textStyles.bodyFont,
  color: colors.lightText,
};
const toastDefaultStyle = {
  maxWidth: "80%",
};
const toastDefaultSettings = {
  duration: 1250,
};

export const toastOptions = {
  error: {
    ...toastDefaultSettings,
    containerStyle: {
      ...toastDefaultStyle,
      backgroundColor: colors.error,
    },
    textStyle: toastDefaultTextStyle,
    duration: 2500,
  },
  success: {
    ...toastDefaultSettings,
    containerStyle: {
      ...toastDefaultStyle,
      backgroundColor: colors.success,
    },
    textStyle: toastDefaultTextStyle,
    position: -75,
  },
};

export const icons = {
  eventSelector: "chevron-down",
  logout: "logout",
  reload: "refresh",
  "Event Sign In": "account-check",
  "Check In": "qrcode-scan",
};

export const images = {
  headerLogo: {
    source: require("../assets/images/bitcamp-logo-mono-light.png"),
    aspectRatio: 2753 / 614, // This is needed to ensure responsive sizing in the header
  },
};
