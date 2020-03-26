import React, { useContext } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { baseStyles, colors } from "../styleConfig";
import RegistrationContext, { reset } from "../contexts/RegistrationContext";
import TextButton from "../components/TextButton";

/**
 * A row of buttons for the registration context. Renders a cancel/reset
 * button on the left, and an accept button on the right.
 */
export default function RejectAcceptButtons({
  acceptAction,
  acceptText,
  rejectText,
}) {
  const { dispatch } = useContext(RegistrationContext);

  return (
    <View style={styles.buttonContainer}>
      <TextButton
        onPress={() => dispatch({ type: reset })}
        containerStyle={[styles.button, styles.cancelButton]}
      >
        {rejectText}
      </TextButton>
      <TextButton
        color={colors.primary}
        onPress={acceptAction}
        containerStyle={styles.button}
      >
        {acceptText}
      </TextButton>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginHorizontal: baseStyles.spacing / 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    padding: baseStyles.spacing,
  },
  cancelButton: {
    backgroundColor: colors.cancel,
    borderColor: colors.primary,
    borderWidth: baseStyles.borderWidth,
    overflow: "visible",
  },
});

RejectAcceptButtons.propTypes = {
  acceptAction: PropTypes.func.isRequired,
  acceptText: PropTypes.string.isRequired,
  rejectText: PropTypes.string,
};

RejectAcceptButtons.defaultProps = {
  rejectText: "Cancel",
};
