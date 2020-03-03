import React, { useContext } from "react";
import {
  NetworkError,
  AuthorizationError,
  getErrorMessage,
} from "../actions/ErrorTypes";
import RegistrationContext, {
  registrationPages,
} from "../contexts/RegistrationContext";
import RegistrationPage from "./RegistrationPage";
import BodyText from "../components/BodyText";

/**
 * Error screen for when the NFC registration flow reaches a fatal error
 */
export default function ErrorPage() {
  const {
    state: { errorInfo },
  } = useContext(RegistrationContext);

  return (
    <RegistrationPage title={registrationPages.error}>
      <BodyText>{getErrorMessage(errorInfo)}</BodyText>
    </RegistrationPage>
  );
}
