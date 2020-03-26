import React, { useContext } from "react";
import RegistrationContext, {
  registrationPages,
  reset,
} from "../contexts/RegistrationContext";
import RegistrationPage from "./RegistrationPage";
import ErrorScreen from "../components/ErrorScreen";

/**
 * Error screen for when the NFC registration flow reaches a fatal error
 */
export default function ErrorPage() {
  const {
    state: { errorInfo },
    dispatch,
  } = useContext(RegistrationContext);

  return (
    <RegistrationPage title={registrationPages.error}>
      <ErrorScreen
        error={errorInfo}
        reloadAction={() => dispatch({ type: reset })}
      />
    </RegistrationPage>
  );
}
