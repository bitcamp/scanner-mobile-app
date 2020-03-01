import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";
import { textStyles, baseStyles } from "../styleConfig";
import BaseText from "./BaseText";

/**
 * Text component for titles
 */
export default function Title({ children, style, onDarkBackground }) {
  return (
    <BaseText
      style={style}
      defaultStyle={styles.title}
      onDarkBackground={onDarkBackground}
    >
      {children}
    </BaseText>
  );
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
  style: Text.propTypes.style,
  onDarkBackground: PropTypes.bool,
};

Title.defaultProps = {
  style: null,
  onDarkBackground: false,
};

const styles = StyleSheet.create({
  title: {
    fontFamily: textStyles.titleFont,
    fontSize: textStyles.large,
    padding: baseStyles.spacing,
  },
});
