import React from "react";
import PropTypes from "prop-types";
import BodyText from "../components/BodyText";
import { getErrorMessage } from "../actions/ErrorTypes";
import Screen from "../components/Screen";
import Splash from "../Splash/Splash";

/**
 * Renders a screen while events are loading
 */
export default function EventLoader({ loadingState, error }) {
  return loadingState === null ? (
    <Splash />
  ) : (
    <Screen>
      <BodyText>{getErrorMessage(error)}</BodyText>
    </Screen>
  );
}

EventLoader.propTypes = {
  loadingState: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
};

EventLoader.defaultProps = {
  loadingState: null,
  error: null,
};
