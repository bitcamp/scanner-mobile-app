import React from "react";
import { View, StyleSheet } from "react-native";
import Loader from "../components/Loader";

/**
 * The loading screen
 */
export default function Splash() {
  return (
    <View style={styles.centerContent}>
      <Loader />
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
