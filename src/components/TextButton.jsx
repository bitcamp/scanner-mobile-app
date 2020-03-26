import React from "react";
import PropTypes from "prop-types";

import { StyleSheet, ViewPropTypes, Text } from "react-native";
import { textStyles } from "../styleConfig";
import BodyText from "./BodyText";
import BaseButton from "./BaseButton";

/**
 * A button with centered text inside
 */
export default function TextButton({
  children,
  containerStyle,
  textStyle,
  onPress,
  disabled,
}) {
  return (
    <BaseButton
      onPress={onPress}
      disabled={disabled}
      containerStyle={containerStyle}
    >
      <BodyText light style={[styles.buttonText, textStyle]}>
        {children}
      </BodyText>
    </BaseButton>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: textStyles.medium,
    fontWeight: "bold",
    textAlign: "center",
  },
});

TextButton.propTypes = {
  children: PropTypes.string.isRequired,
  containerStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

TextButton.defaultProps = {
  containerStyle: null,
  textStyle: null,
  disabled: false,
};
