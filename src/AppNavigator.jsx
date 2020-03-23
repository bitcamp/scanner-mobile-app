import React, { useContext, useEffect, useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, StyleSheet } from "react-native";
import AuthContext from "./contexts/AuthContext";
import { colors } from "./styleConfig";
import Splash from "./Splash/Splash";
import Login from "./Login/Login";
import Home from "./Home/Home";
import BodyText from "./components/BodyText";
import ErrorScreen from "./components/ErrorScreen";

const Stack = createNativeStackNavigator();

/** The app's primary stack navigator */
export default function AppNavigator() {
  const { authState, authAPI } = useContext(AuthContext);

  // Fetch the user token when the app loads
  useEffect(() => {
    authAPI.fetchUserToken();
  }, [authAPI]);

  // Determine which screen to display based on the authorization status
  const primaryScreen = useMemo(() => {
    // Show a loading screen while fetching the token
    if (authState.isLoadingToken) {
      return (
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
      );
    }

    // If there is an error signing in, display an error screen
    if (authState.error) {
      return (
        <Stack.Screen
          name="Error"
          component={ErrorScreen}
          options={{
            headerShown: false,
          }}
        />
      );
    }

    // No there is no error and no token, the user isn't signed in
    if (authState.userToken === null) {
      return (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "Log in",
          }}
        />
      );
    }

    // User is signed in
    return (
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={authAPI.signOut}>
              <BodyText style={styles.logout} light>
                Log Out
              </BodyText>
            </TouchableOpacity>
          ),
        }}
      />
    );
  }, [
    authAPI.signOut,
    authState.error,
    authState.isLoadingToken,
    authState.userToken,
  ]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.lightText,
        headerTitleStyle: {
          fontWeight: "bold",
          color: colors.lightText,
        },
      }}
    >
      {primaryScreen}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  logout: {
    marginRight: 10,
  },
});
