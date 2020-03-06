import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { RNCamera } from "react-native-camera";
import { useIsFocused } from "@react-navigation/native";
import RegistrationPage from "./RegistrationPage";
import RegistrationContext, {
  registrationPages,
  registrationActions,
} from "../contexts/RegistrationContext";
import AuthContext from "../contexts/AuthContext";
import { validateQRCode } from "../actions/NFCRegistration";
import QRViewFinder from "./QRViewFinder";
import Title from "../components/Title";
import BodyText from "../components/BodyText";

/**
 * A QR code scanner dialogue
 */
export default function QRScanner() {
  const { dispatch } = useContext(RegistrationContext);
  const {
    authState: { userToken },
  } = useContext(AuthContext);

  const isFocused = useIsFocused();

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
      {isFocused && (
        <RNCamera
          style={styles.camera}
          onBarCodeRead={({ data }) => handleQRScan(data)}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          flashMode={RNCamera.Constants.FlashMode.auto}
          androidCameraPermissionOptions={{
            title: "Bitcamp needs permission to use the camera",
            message: "We need the camera to scan QR codes",
            buttonPositive: "Ok",
            buttonNegative: "Cancel",
          }}
          androidRecordAudioPermissionOptions={{
            title: "Bitcamp needs permission to use the microphone",
            message: "We need the microphone to show real-time video",
            buttonPositive: "Ok",
            buttonNegative: "Cancel",
          }}
        >
          {({ status, recordAudioPermissionStatus: audioStatus }) =>
            // Render some sort of error screen if the user hasn't granted audio or camera access
            status === RNCamera.Constants.CameraStatus.NOT_AUTHORIZED ||
            audioStatus === RNCamera.Constants.CameraStatus.NOT_AUTHORIZED ? (
              <View>
                <BodyText onDarkBackground style={styles.noPermissions}>
                  Please grant the app camera and audio permissions to scan QR
                  codes
                </BodyText>
              </View>
            ) : (
              <QRViewFinder
                topView={
                  <>
                    <Title onDarkBackground style={styles.infoText}>
                      User Check In
                    </Title>
                    <BodyText onDarkBackground style={styles.infoText}>
                      Align a hacker&apos;s QR code with the view finder to
                      start check-in
                    </BodyText>
                  </>
                }
              />
            )
          }
        </RNCamera>
      )}
    </RegistrationPage>
  );
}

const styles = StyleSheet.create({
  camera: {
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "center",
  },
  infoText: {
    paddingHorizontal: 15,
    textAlign: "center",
  },
  noPermissions: {
    fontSize: 20,
    padding: 20,
    textAlign: "center",
  },
});
