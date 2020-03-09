import React, { useContext } from "react";
import { Button } from "react-native";
import AuthContext from "../contexts/AuthContext";
import Screen from "../components/Screen";
import { colors } from "../styleConfig";

/**
 * The screen where organizers can log into the app
 */
export default function Login() {
  const { authAPI } = useContext(AuthContext);
  return (
    <Screen>
      <Button onPress={authAPI.signIn} title="Login" color={colors.primary} />
    </Screen>
  );
}
