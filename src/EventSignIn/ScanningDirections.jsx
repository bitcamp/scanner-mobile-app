import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import BodyText from "../components/BodyText";
import { textStyles, baseStyles } from "../styleConfig";

/**
 * Explains how to scan an NFC code using an itemized list
 */
export default function ScanningDirections() {
  const directions = [
    "Select an event from the dropdown above",
    'Tap the "Scan Wristband" button',
    "Place the wristband underneath your phone",
    "The user will be signed in!",
  ];

  return (
    <FlatList
      data={directions}
      renderItem={({ item: direction, index }) => (
        <View style={styles.directionContainer}>
          <BodyText style={styles.directionNumber}>{`${index + 1}.`}</BodyText>
          <BodyText style={styles.direction}>{direction}</BodyText>
        </View>
      )}
      keyExtractor={item => item}
    />
  );
}

const styles = StyleSheet.create({
  direction: {
    flexShrink: 1,
    fontSize: textStyles.medium,
  },
  directionContainer: {
    flexDirection: "row",
    flex: 1,
    paddingVertical: baseStyles.spacing / 2,
  },
  directionNumber: {
    fontSize: textStyles.medium,
    fontWeight: "bold",
    marginRight: baseStyles.spacing / 2,
  },
});
