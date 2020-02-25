import React from "react";
import { ActivityIndicator } from "react-native";
import { colors } from "../styleConfig";

/**
 * The app's loading icon
 */
export default function Loader() {
  return <ActivityIndicator size="large" color={colors.primaryColor} />;
}
