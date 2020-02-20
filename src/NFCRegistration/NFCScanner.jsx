import React, { useContext } from "react";
import { Button } from "react-native";
import RegistrationPage from "./RegistrationPage";
import RegistrationContext, {
  registrationPages,
  registrationActions,
} from "../contexts/RegistrationContext";
import { colors } from "../styleConfig";
import { registerNfcBand } from "../actions/NFCRegistration";

/**
 * A QR code scanner
 */
export default function QRScanner() {
  const {
    state: { userToken },
    dispatch,
  } = useContext(RegistrationContext);

  /**
   * Attempts to validate the provided NFC data
   * @param {string} nfcData the data extracted from the nfc wristband
   */
  const handleNFCScan = async nfcData => {
    const {
      startRegisteringNfc,
      scanFailure,
      nfcRegistrationSuccess,
    } = registrationActions;

    dispatch({ type: startRegisteringNfc });

    try {
      await registerNfcBand(nfcData, userToken);
      dispatch({ type: nfcRegistrationSuccess });
    } catch (e) {
      // TODO: add error handling
      dispatch({ type: scanFailure, errorInfo: e });
    }
  };

  return (
    <RegistrationPage title={registrationPages.nfcScan}>
      <Button
        onPress={() => handleNFCScan("randomString")}
        title="Scan NFC Code"
        color={colors.primaryColor}
      />
    </RegistrationPage>
  );
}
