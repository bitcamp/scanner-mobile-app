import React from "react";
import { View, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

/**
 * A full page screen that centers its content
 */
export default function Screen({ children, style }) {
  return <View style={[styles.fullScreen, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  fullScreen: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

Screen.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
};

Screen.defaultProps = {
  children: null,
  style: null,
};
