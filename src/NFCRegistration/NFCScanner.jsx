import React, { useContext } from "react";
import { Button } from "react-native";
import RegistrationPage from "./RegistrationPage";
import RegistrationContext, {
  registrationPages,
  startRegisteringNfc,
  scanFailure,
  nfcRegistrationSuccess,
} from "../contexts/RegistrationContext";
import { colors } from "../styleConfig";
import { registerNfcBand } from "../actions/NFCRegistration";
import CancelButton from "./CancelButton";

/**
 * The NFC Scanning dialogue
 */
export default function NFCScanner() {
  const {
    state: { userToken },
    dispatch,
  } = useContext(RegistrationContext);

  /**
   * Attempts to validate the provided NFC data
   * @param {string} nfcData the data extracted from the nfc wristband
   */
  const handleNFCScan = async nfcData => {
    dispatch({ type: startRegisteringNfc });

    try {
      await registerNfcBand(nfcData, userToken);
      dispatch({ type: nfcRegistrationSuccess });
    } catch (e) {
      dispatch({ type: scanFailure, errorInfo: e });
    }
  };

  return (
    <RegistrationPage title={registrationPages.nfcScan}>
      <Button
        onPress={() => handleNFCScan("randomString")}
        title="Scan NFC Code"
        color={colors.primary}
      />
      <CancelButton />
    </RegistrationPage>
  );
}
