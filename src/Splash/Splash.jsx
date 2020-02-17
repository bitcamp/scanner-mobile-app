import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

/**
 * The loading screen
 */
export default function Splash() {
  return (
    <View style={styles.centerContent}>
      <ActivityIndicator size="large" color="orange" />
    </View>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
