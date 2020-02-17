import React, { Component } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import { validateQRCode } from "../actions/NFCRegistration";
import { NetworkError, AuthorizationError } from "../actions/ErrorTypes";
import AuthContext from "../contexts/AuthContext";
import Loader from "../components/Loader";
import { colors } from "../styleConfig";

/**
 * The screen for associating a user with a given NFC wristband
 */
export default class RegistrationScanner extends Component {
  state = RegistrationScanner.getInitialState();

  static getInitialState() {
    return {
      scanningState: "IDLE", // "IDLE"|"SCANNING"|"SUCCESS"|"ERROR"
      userData: null,
      errorInfo: null,
    };
  }

  /**
   * Attempts to validate the provided QR code
   * @param {string} qrData the data extracted from the qr code
   */
  async handleQRScan(qrData) {
    const {
      authState: { userToken },
    } = this.context;

    this.setState({ scanningState: "SCANNING" });

    try {
      const userData = await validateQRCode(qrData, userToken);
      this.setState({ scanningState: "SUCCESS", userData });
    } catch (e) {
      // TODO: add error handling
      this.setState({ scanningState: "ERROR", errorInfo: e });
    }
  }

  render() {
    const { scanningState, userData, errorInfo } = this.state;

    let content;
    let errorText = "Encountered";

    // Determine what to render based on the scanning state
    switch (scanningState) {
      case "IDLE":
        content = (
          <Button
            onPress={() => this.handleQRScan("randomString")}
            title="Scan QR Code"
            color={colors.primaryColor}
          />
        );
        break;
      case "SCANNING":
        content = <Loader />;
        break;
      case "SUCCESS":
        content = (
          <View>
            <Text>Is this {userData.name}?</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="No"
                onPress={() =>
                  this.setState(RegistrationScanner.getInitialState())
                }
              />
              <Button title="Yes" color={colors.primaryColor} onPress={} />
            </View>
          </View>
        );
        break;
      case "ERROR":
        if (errorInfo instanceof NetworkError) {
          errorText += " a Network Error";
        } else if (errorInfo instanceof AuthorizationError) {
          errorText += " an Authorization Error";
        } else {
          errorText += " an Error";
        }

        content = <Text>{errorText}</Text>;
        break;
      default:
        console.error("Invalid scanning state:", scanningState); // TODO: remove after prototyping
        break;
    }

    return <Screen title="Registration Scanner">{content}</Screen>;
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});
