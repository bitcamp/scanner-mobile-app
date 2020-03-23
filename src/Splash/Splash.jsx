import React from "react";
import Screen from "../components/Screen";
import Loader from "../components/Loader";

/**
 * The loading screen
 */
export default function Splash() {
  return (
    <Screen>
      <Loader />
    </Screen>
  );
}
