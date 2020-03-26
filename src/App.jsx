import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { StatusBar } from "react-native";
import { AuthProvider } from "./contexts/AuthContext";
import AppNavigator from "./AppNavigator";
import { statusBarStyles } from "./styleConfig";

// This is an optimization that improves performance with multi-screen apps
enableScreens();

export default function App() {
  return (
    <>
      <StatusBar
        animated
        backgroundColor={statusBarStyles.backgroundColor}
        barStyle={statusBarStyles.barStyle}
      />
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </>
  );
}
