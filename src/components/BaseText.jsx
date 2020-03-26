import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";
import { colors } from "../styleConfig";

/**
 * The base text component. Used to construct the other foundational text components.
 */
export default function BaseText({ children, defaultStyle, style, light }) {
  return (
    <Text
      style={[
        styles.baseText,
        defaultStyle,
        light ? styles.light : null,
        style,
      ]}
    >
      {children}
    </Text>
  );
}

BaseText.propTypes = {
  children: PropTypes.node,
  style: Text.propTypes.style,
  defaultStyle: Text.propTypes.style,
  light: PropTypes.bool,
};

BaseText.defaultProps = {
  style: null,
  light: false,
  defaultStyle: null,
  children: "",
};

const styles = StyleSheet.create({
  baseText: {
    color: colors.darkText,
  },
  light: {
    color: colors.lightText,
  },
});
