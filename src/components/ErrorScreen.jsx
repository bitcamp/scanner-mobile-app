import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import Screen from "./Screen";
import BodyText from "./BodyText";
import { textStyles } from "../styleConfig";
import { CustomError } from "../actions/errors";

/**
 * @param error the error that was encountered
 * @returns an error message based on the error's type
 */
function getErrorMessage(error) {
  return error
    ? `${error instanceof CustomError ? error.constructor.name : "Error"}\n${
        error.message
      }`
    : "Error";
}

/**
 * Displays an error message on screen given an error object from props
 */
export default function ErrorScreen({ error }) {
  return (
    <Screen>
      <BodyText style={styles.centeredText}>{getErrorMessage(error)}</BodyText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  centeredText: {
    fontSize: textStyles.medium,
    textAlign: "center",
  },
});

ErrorScreen.propTypes = {
  error: PropTypes.instanceOf(Error),
};

ErrorScreen.defaultProps = {
  error: null,
};
