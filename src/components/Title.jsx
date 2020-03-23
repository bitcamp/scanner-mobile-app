import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";
import { textStyles, baseStyles } from "../styleConfig";
import BaseText from "./BaseText";

/**
 * Text component for titles
 */
export default function Title({ children, style, light }) {
  return (
    <BaseText style={style} defaultStyle={styles.title} light={light}>
      {children}
    </BaseText>
  );
}

Title.propTypes = {
  children: PropTypes.node,
  style: Text.propTypes.style,
  light: PropTypes.bool,
};

Title.defaultProps = {
  style: null,
  light: false,
  children: "",
};

const styles = StyleSheet.create({
  title: {
    fontFamily: textStyles.titleFont,
    fontSize: textStyles.large,
    padding: baseStyles.spacing,
  },
});
