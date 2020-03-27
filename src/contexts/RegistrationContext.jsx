import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import { IllegalArgumentError } from "../actions/errors";

/**
 * The context for managing the nfc wristband registration flow
 */
const RegistrationContext = createContext();

// Registration reducer action types
export const startValidatingQr = "START VALIDATING QR";
export const startRegisteringNfc = "START REGISTERING NFC";
export const qrScanSuccess = "QR SCAN SUCCESS";
export const nfcRegistrationSuccess = "NFC SCAN SUCCESS";
export const confirmUserData = "CONFIRM USER DATA";
export const resetPrevUser = "RESET LAST USER";
export const scanFailure = "SCAN FAILURE";
export const reset = "RESET";

/**
 * Handles the registration flow for a new user
 * @param {*} prevState
 * @param {*} action
 */
function registrationReducer(prevState, action) {
  switch (action.type) {
    case startValidatingQr:
      return {
        ...prevState,
        activePage: registrationPages.loading,
      };

    case startRegisteringNfc:
      return {
        ...prevState,
        activePage: registrationPages.loading,
      };

    case qrScanSuccess:
      return {
        ...prevState,
        userData: action.payload,
        activePage: registrationPages.userDataReview,
      };

    case confirmUserData:
      return {
        ...prevState,
        activePage: registrationPages.nfcScan,
      };

    case scanFailure:
      return {
        ...prevState,
        activePage: registrationPages.error,
        errorInfo: action.errorInfo,
      };

    case nfcRegistrationSuccess:
      return {
        ...initialState,
        prevUserData: prevState.userData,
      };

    case resetPrevUser:
      return {
        ...prevState,
        prevUserData: null,
      };

    case reset:
      return initialState;

    default:
      throw new IllegalArgumentError(`Unhandled action type: ${action.type}`);
  }
}

/**
 * Provides the current state of the NFC registration flow and
 * the dispatcher to any children
 */
export function RegistrationProvider({ children }) {
  const [state, dispatch] = useReducer(registrationReducer, initialState);

  return (
    <RegistrationContext.Provider value={{ state, dispatch }}>
      {children}
    </RegistrationContext.Provider>
  );
}

/** An enum with each of the possible pages in the NFC registration flow */
export const registrationPages = {
  /** The starting screen, where organizers can scan QR codes */
  qrScan: "QR SCANNER",
  /** The user info review screen, where organizers can make sure they're signing
   *  in the correct user */
  userDataReview: "USER DATA REVIEW",
  /** The NFC scanning screen, which should only be accessible after organizers
   *  have validated a user's info (and checked their photo ID) */
  nfcScan: "NFC SCANNER",
  /** The loading screen */
  loading: "LOADING",
  /** The error screen */
  error: "ERROR",
};

/** The initial state of the context */
const initialState = {
  activePage: registrationPages.qrScan,
  userData: {
    name: "hi",
  },
  prevUserData: null,
  errorInfo: null,
};

RegistrationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RegistrationContext;
