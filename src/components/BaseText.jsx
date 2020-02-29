import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";
import { textStyles } from "../styleConfig";

/**
 * The base text component. Used to construct the other foundational text components.
 */
export default function BaseText({
  children,
  defaultStyle,
  style,
  onDarkBackground,
}) {
  return (
    <Text style={[defaultStyle, onDarkBackground && styles.darkBg, style]}>
      {children}
    </Text>
  );
}

BaseText.propTypes = {
  children: PropTypes.node.isRequired,
  style: Text.propTypes.style,
  defaultStyle: Text.propTypes.style,
  onDarkBackground: PropTypes.bool,
};

BaseText.defaultProps = {
  style: null,
  onDarkBackground: false,
  defaultStyle: null,
};

const styles = StyleSheet.create({
  darkBg: {
    color: textStyles.darkBGColor,
  },
});
