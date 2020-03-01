import React from "react";
import { RectButton } from "react-native-gesture-handler";
import PropTypes from "prop-types";

import { StyleSheet, View, ViewPropTypes, Text } from "react-native";
import { colors, baseStyles, textStyles } from "../styleConfig";
import BodyText from "./BodyText";
import noop from "../actions/noop";

/**
 * A button with centered text inside
 */
export default function TextButton({
  children,
  viewStyle,
  textStyle,
  onPress,
  disabled,
}) {
  return (
    <RectButton
      style={[
        styles.buttonContainer,
        disabled ? styles.disabled : null,
        viewStyle,
      ]}
      rippleColor={disabled ? colors.button : colors.ripple}
      onPress={disabled ? noop : onPress}
    >
      <View accessible>
        <BodyText onDarkBackground style={[styles.buttonText, textStyle]}>
          {children}
        </BodyText>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    backgroundColor: colors.button,
    borderRadius: baseStyles.borderRadius * 2,
    padding: baseStyles.spacing / 2,
  },
  buttonText: {
    fontSize: textStyles.medium,
    fontWeight: "bold",
    textAlign: "center",
  },
  disabled: {
    opacity: 0.6,
  },
});

TextButton.propTypes = {
  children: PropTypes.string.isRequired,
  viewStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

TextButton.defaultProps = {
  viewStyle: null,
  textStyle: null,
  disabled: false,
};
