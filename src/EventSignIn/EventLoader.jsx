import React from "react";
import PropTypes from "prop-types";
import Splash from "../Splash/Splash";
import ErrorScreen from "../components/ErrorScreen";

/**
 * Renders a screen while events are loading
 */
export default function EventLoader({ loadingState, error }) {
  return loadingState === null ? <Splash /> : <ErrorScreen error={error} />;
}

EventLoader.propTypes = {
  loadingState: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
};

EventLoader.defaultProps = {
  loadingState: null,
  error: null,
};
