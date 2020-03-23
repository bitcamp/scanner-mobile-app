import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import { IllegalArgumentError } from "../actions/errors";

/**
 * The context for managing the nfc wristband registration flow
 */
const RegistrationContext = createContext();

/**
 * Provides the current state of the NFC registration flow and
 * the dispatcher to any children
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

      case registrationActions.nfcRegistrationSuccess:
      case registrationActions.reset:
        return initialState;

      default:
        throw new IllegalArgumentError(`Unhandled action type: ${action.type}`);
    }
  }, initialState);

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
  error: "Error",
};

/** An enum with each type of action for this reducer */
export const registrationActions = {
  /** This action fires when qr validation starts */
  startValidatingQr: "START VALIDATING QR",
  /** This action fires when nfc registration starts */
  startRegisteringNfc: "START REGISTERING NFC",
  /** This action fires when qr validation succeeds */
  qrScanSuccess: "QR SCAN SUCCESS",
  /** This action fires when nfc registration succeeds */
  nfcRegistrationSuccess: "NFC SCAN FAILURE",
  /** This action fires when an organizer confirms the scanned user data */
  confirmUserData: "CONFIRM USER DATA",
  /** This action fires when the registration flow is reset */
  reset: "RESET",
};

/** The initial state of the context */
const initialState = {
  activePage: registrationPages.qrScan,
  userData: null,
  errorInfo: null,
};

RegistrationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RegistrationContext;
