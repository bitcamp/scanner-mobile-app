import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";
import { textStyles } from "../styleConfig";
import BaseText from "./BaseText";

/**
 * Text component for regular text
 */
export default function BodyText({ children, style, light }) {
  return (
    <BaseText style={style} light={light} defaultStyle={styles.bodyText}>
      {children}
    </BaseText>
  );
}

BodyText.propTypes = {
  children: PropTypes.node.isRequired,
  style: Text.propTypes.style,
  light: PropTypes.bool,
};

BodyText.defaultProps = {
  style: null,
  light: false,
};

const styles = StyleSheet.create({
  bodyText: {
    fontFamily: textStyles.bodyFont,
    fontSize: textStyles.body,
  },
});
