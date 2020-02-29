import React from "react";
import Screen from "../components/Screen";
import UserDataReview from "./UserDataReview";
import { RegistrationProvider } from "../contexts/RegistrationContext";
import QRScanner from "./QRScanner";
import NFCScanner from "./NFCScanner";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";

/**
 * The screen for associating a user with a given NFC wristband
 */
export default function NFCRegistration() {
  return (
    <RegistrationProvider>
      <Screen>
        <QRScanner />
        <UserDataReview />
        <NFCScanner />
        <LoadingPage />
        <ErrorPage />
      </Screen>
    </RegistrationProvider>
  );
}
