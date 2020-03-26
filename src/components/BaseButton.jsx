import React from "react";
import { RectButton } from "react-native-gesture-handler";
import PropTypes from "prop-types";

import { StyleSheet, View, ViewPropTypes } from "react-native";
import { colors, baseStyles } from "../styleConfig";
import noop from "../actions/noop";

/**
 * A button with centered content inside
 */
export default function BaseButton({
  children,
  containerStyle,
  onPress,
  disabled,
}) {
  return (
    <RectButton
      style={[
        styles.buttonContainer,
        disabled ? styles.disabled : null,
        containerStyle,
      ]}
      rippleColor={
        // Mimics no ripple when the button is disabled
        disabled ? colors.button : colors.ripple
      }
      onPress={disabled ? noop : onPress}
    >
      <View style={styles.contentContainer} accessible={!disabled}>
        {children}
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.button,
    borderRadius: baseStyles.borderRadius * 2,
    padding: baseStyles.spacing / 2,
  },
  contentContainer: {
    alignItems: "center",
  },
  disabled: {
    opacity: 0.6,
  },
});

BaseButton.propTypes = {
  children: PropTypes.node.isRequired,
  containerStyle: ViewPropTypes.style,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

BaseButton.defaultProps = {
  containerStyle: null,
  disabled: false,
};
