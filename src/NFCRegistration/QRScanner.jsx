import React, { useContext } from "react";
import { Button } from "react-native";
import RegistrationPage from "./RegistrationPage";
import RegistrationContext, {
  registrationPages,
  registrationActions,
} from "../contexts/RegistrationContext";
import { colors } from "../styleConfig";
import { validateQRCode } from "../actions/NFCRegistration";

/**
 * A QR code scanner dialogue
 */
export default function QRScanner() {
  const {
    state: { userToken },
    dispatch,
  } = useContext(RegistrationContext);

  /**
   * Attempts to validate the provided QR code
   * @param {string} qrData the data extracted from the qr code
   */
  const handleQRScan = async qrData => {
    const {
      startValidatingQr,
      scanFailure,
      qrScanSuccess,
    } = registrationActions;

    dispatch({
      type: startValidatingQr,
    });

    try {
      const userData = await validateQRCode(qrData, userToken);
      dispatch({
        type: qrScanSuccess,
        payload: userData,
      });
    } catch (e) {
      // TODO: add error handling
      dispatch({ type: scanFailure, errorInfo: e });
    }
  };

  return (
    <RegistrationPage title={registrationPages.qrScan}>
      <Button
        onPress={() => handleQRScan("randomString")}
        title="Scan QR Code"
        color={colors.primaryColor}
      />
    </RegistrationPage>
  );
}
