import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";
import { textStyles } from "../styleConfig";
import BaseText from "./BaseText";

/**
 * Text component for regular text
 */
export default function BodyText({ children, style, onDarkBackground }) {
  return (
    <BaseText
      style={style}
      onDarkBackground={onDarkBackground}
      defaultStyle={styles.bodyText}
    >
      {children}
    </BaseText>
  );
}

BodyText.propTypes = {
  children: PropTypes.node.isRequired,
  style: Text.propTypes.style,
  onDarkBackground: PropTypes.bool,
};

BodyText.defaultProps = {
  style: null,
  onDarkBackground: false,
};

const styles = StyleSheet.create({
  bodyText: {
    fontFamily: textStyles.bodyFont,
    fontSize: textStyles.body,
  },
});
