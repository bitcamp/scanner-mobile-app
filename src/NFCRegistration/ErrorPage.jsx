import React, { useContext } from "react";
import { Text } from "react-native";
import { NetworkError, AuthorizationError } from "../actions/ErrorTypes";
import RegistrationContext, {
  registrationPages,
} from "../contexts/RegistrationContext";
import RegistrationPage from "./RegistrationPage";

/**
 * Error screen for when the NFC registration flow reaches a fatal error
 */
export default function ErrorPage() {
  const {
    state: { errorInfo },
  } = useContext(RegistrationContext);

  let errorText = "Encountered ";
  if (errorInfo instanceof NetworkError) {
    errorText += "a Network Error";
  } else if (errorInfo instanceof AuthorizationError) {
    errorText += "an Authorization Error";
  } else {
    errorText += "an Error";
  }

  return (
    <RegistrationPage title={registrationPages.error}>
      <Text>{errorText}</Text>
    </RegistrationPage>
  );
}
