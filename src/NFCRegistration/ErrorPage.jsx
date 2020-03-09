import React, { useContext } from "react";
import RegistrationContext, {
  registrationPages,
} from "../contexts/RegistrationContext";
import RegistrationPage from "./RegistrationPage";
import ErrorScreen from "../components/ErrorScreen";

/**
 * Error screen for when the NFC registration flow reaches a fatal error
 */
export default function ErrorPage() {
  const {
    state: { errorInfo },
  } = useContext(RegistrationContext);

  return (
    <RegistrationPage title={registrationPages.error}>
      <ErrorScreen error={errorInfo} />
    </RegistrationPage>
  );
}
