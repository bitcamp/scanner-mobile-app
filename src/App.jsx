import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { AuthProvider } from "./contexts/AuthContext";
import AppNavigator from "./AppNavigator";

// This is an optimization that improves performance with multi-screen apps
enableScreens();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
