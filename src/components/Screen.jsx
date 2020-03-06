import React from "react";
import { View, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

/**
 * A full page screen meant as a stand-in for actual components in the future
 * TODO: delete this file when actual screens are created
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
