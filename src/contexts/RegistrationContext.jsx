import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";

/**
 * The context for managing the nfc wristband registration flow
 */
const RegistrationContext = createContext();

/**
 * Provides the current registration state (i.e. activePage, userData) and
 * the dispatcher
 */
export function RegistrationProvider({ children }) {
  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case registrationActions.startValidatingQr:
        return {
          ...prevState,
          activePage: registrationPages.loading,
          userData: null,
          error: null,
        };

      case registrationActions.startRegisteringNfc:
        return {
          ...prevState,
          activePage: registrationPages.loading,
          error: null,
        };

      case registrationActions.qrScanSuccess:
        return {
          ...prevState,
          userData: action.payload,
          activePage: registrationPages.userDataReview,
        };

      case registrationActions.nfcRegistrationSuccess:
        return initialState;

      case registrationActions.confirmUserData:
        return {
          ...prevState,
          activePage: registrationPages.nfcScan,
        };

      case registrationActions.scanFailure:
        return {
          ...prevState,
          activePage: registrationPages.error,
          errorInfo: action.errorInfo,
        };

      case registrationActions.reset:
        return initialState;

      default:
        console.error("Passing an illegal registration action");
        return prevState;
    }
  }, initialState);

  return (
    <RegistrationContext.Provider value={{ state, dispatch }}>
      {children}
    </RegistrationContext.Provider>
  );
}

/** An enum with each of the possible pages in the registration flow */
export const registrationPages = {
  qrScan: "QR SCANNER",
  nfcScan: "NFC SCANNER",
  userDataReview: "USER DATA REVIEW",
  loading: "LOADING",
  error: "Error",
};

/** An enum with each type of action for this reducer */
export const registrationActions = {
  startValidatingQr: "START VALIDATING QR",
  startRegisteringNfc: "START VALIDATING NFC",
  qrScanSuccess: "QR SCAN SUCCESS",
  nfcRegistrationSuccess: "NFC SCAN FAILURE",
  confirmUserData: "CONFIRM USER DATA",
  reset: "RESET",
};

const initialState = {
  activePage: registrationPages.qrScan,
  userData: null,
  errorInfo: null,
};

RegistrationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RegistrationContext;
