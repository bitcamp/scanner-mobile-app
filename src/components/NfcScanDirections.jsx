import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  ViewPropTypes,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";
import { icons, baseStyles, colors } from "../styleConfig";
import BodyText from "./BodyText";

// Scanning configurations
const scanBarHeight = 6;
const scanBarStart = 10;
const scanBarEnd = baseStyles.prominentIconSize - scanBarStart + scanBarHeight;
const scanBarTiming = Easing.inOut(Easing.quad);

/**
 * Displays directions and a nice UI for using NFC scanning. Adjusts
 * the UI based on whether the scanner is active.
 */
export default function NfcScanDirections({
  scannerIsActive,
  inactiveText,
  style,
}) {
  const scanAnim = useRef(new Animated.Value(scanBarStart)).current;

  useEffect(() => {
    if (scannerIsActive) {
      // Repeat the scanning effect infinitely
      Animated.loop(
        Animated.sequence([
          // Go to the bottom of the icon
          Animated.timing(scanAnim, {
            toValue: scanBarEnd,
            easing: scanBarTiming,
            duration: 2000,
            useNativeDriver: false,
          }),
          // Go back to the top of the icon
          Animated.timing(scanAnim, {
            toValue: scanBarStart,
            easing: scanBarTiming,
            duration: 2000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      // Return to the beginning
      Animated.timing(scanAnim, {
        toValue: scanBarStart,
        duration: 300,
        easing: scanBarTiming,
        useNativeDriver: false,
      }).start();
    }
  }, [scanAnim, scannerIsActive]);

  return (
    <View style={[styles.container, style]}>
      <BodyText style={styles.direction}>
        {scannerIsActive
          ? "Place an NFC wristband below your device to scan in a new user"
          : inactiveText}
      </BodyText>
      <View style={styles.iconContainer}>
        <Icon
          name={icons.nfc}
          size={baseStyles.prominentIconSize}
          color={colors.primary}
        />
        <Animated.View
          style={[
            styles.scanBar,
            { top: scanAnim },
            !scannerIsActive && styles.inactiveScanBar,
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  direction: {
    textAlign: "center",
  },
  iconContainer: {
    marginTop: baseStyles.spacing / 2,
  },
  inactiveScanBar: {
    backgroundColor: colors.disabled,
  },
  scanBar: {
    backgroundColor: colors.nfcScanBar,
    borderRadius: baseStyles.borderRadius / 2,
    height: scanBarHeight,
    left: 10,
    position: "absolute",
    right: 10,
  },
});

NfcScanDirections.propTypes = {
  scannerIsActive: PropTypes.bool,
  inactiveText: PropTypes.string,
  style: ViewPropTypes.style,
};

NfcScanDirections.defaultProps = {
  scannerIsActive: false,
  inactiveText: "Please activate the scanner",
  style: null,
};
