import React, { useContext } from "react";
import RegistrationPage from "./RegistrationPage";
import RegistrationContext, {
  registrationPages,
  startRegisteringNfc,
  scanFailure,
  nfcRegistrationSuccess,
} from "../contexts/RegistrationContext";
import { registerNfcBand } from "../actions/NFCRegistration";
import RejectAcceptButtons from "./RejectAcceptButtons";

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
      <RejectAcceptButtons
        acceptAction={handleNFCScan}
        acceptText="Scan Wristband"
        rejectText="Exit"
      />
    </RegistrationPage>
  );
}
