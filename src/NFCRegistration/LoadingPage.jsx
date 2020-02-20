import React from "react";
import RegistrationPage from "./RegistrationPage";
import { registrationPages } from "../contexts/RegistrationContext";
import Loader from "../components/Loader";

/**
 * The page to display while data is loading during the registration process
 */
export default function LoadingPage() {
  return (
    <RegistrationPage title={registrationPages.loading}>
      <Loader />
    </RegistrationPage>
  );
}
