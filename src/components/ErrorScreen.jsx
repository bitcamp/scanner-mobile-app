import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import Screen from "./Screen";
import BodyText from "./BodyText";
import { textStyles, icons, baseStyles, colors } from "../styleConfig";
import IconButton from "./IconButton";

/**
 * Displays an error message on screen given an error object from props.
 * Also presents a reload button to the user, if the reload props are supplied.
 */
export default function ErrorScreen({
  error,
  reloadAction,
  reloadText,
  reloadIconName,
}) {
  return (
    <Screen>
      <BodyText style={styles.centeredText}>
        {error && error.name && error.message ? (
          <>
            <BodyText style={[styles.centeredText, styles.errorName]}>
              {error.name}
            </BodyText>
            {`: ${error.message}`}
          </>
        ) : (
          "Error"
        )}
      </BodyText>
      {reloadAction && (
        <IconButton
          iconName={reloadIconName}
          iconStyle={styles.reloadIcon}
          containerStyle={styles.reloadButton}
          onPress={reloadAction}
        >
          {reloadText}
        </IconButton>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  centeredText: {
    fontSize: textStyles.medium,
    textAlign: "center",
  },
  errorName: {
    fontWeight: "bold",
  },
  reloadButton: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: baseStyles.spacing,
  },
  reloadIcon: {
    color: colors.lightText,
  },
});

ErrorScreen.propTypes = {
  error: PropTypes.instanceOf(Error),
  reloadAction: PropTypes.func,
  reloadText: PropTypes.string,
  reloadIconName: PropTypes.string,
};

ErrorScreen.defaultProps = {
  error: null,
  reloadAction: null,
  reloadText: "Reset",
  reloadIconName: icons.reload,
};
