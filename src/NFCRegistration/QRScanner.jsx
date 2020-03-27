import React, { useContext, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { RNCamera } from "react-native-camera";
import { useIsFocused } from "@react-navigation/native";
import Toast from "react-native-tiny-toast";
import RegistrationPage from "./RegistrationPage";
import RegistrationContext, {
  registrationPages,
  startValidatingQr,
  scanFailure,
  qrScanSuccess,
  resetPrevUser,
} from "../contexts/RegistrationContext";
import AuthContext from "../contexts/AuthContext";
import { validateQRCode } from "../actions/NFCRegistration";
import QRViewFinder from "./QRViewFinder";
import Title from "../components/Title";
import BodyText from "../components/BodyText";
import { toastOptions } from "../styleConfig";

/**
 * A QR code scanner dialogue
 */
export default function QRScanner() {
  const {
    dispatch,
    state: { prevUserData },
  } = useContext(RegistrationContext);
  const {
    authState: { userToken },
  } = useContext(AuthContext);

  const isFocused = useIsFocused();

  /**
   * Attempts to validate the provided QR code
   * @param {string} qrData the data extracted from the qr code
   */
  const handleQRScan = async (qrData) => {
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
      dispatch({ type: scanFailure, errorInfo: e });
    }
  };

  // Controls whether or not the success toast will attempt to update the context
  const shouldResetPrevUser = useRef(true);

  // Display a toast if a previous user was successfully scanned
  useEffect(() => {
    if (prevUserData) {
      shouldResetPrevUser.current = true;

      Toast.show(`Checked in ${prevUserData.name}`, {
        ...toastOptions.success,
        onHidden: () => {
          if (shouldResetPrevUser.current) {
            dispatch({ type: resetPrevUser });
          }
        },
      });
    }

    return () => {
      // Handle cases where the QRScanner unmounts while the success toast is active
      shouldResetPrevUser.current = false;
    };
  }, [dispatch, prevUserData]);

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
                <BodyText light style={styles.noPermissions}>
                  Please grant the app camera and audio permissions to scan QR
                  codes
                </BodyText>
              </View>
            ) : (
              <QRViewFinder
                topView={
                  <>
                    <Title light style={styles.infoText}>
                      User Check In
                    </Title>
                    <BodyText light style={styles.infoText}>
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
