import React, { useContext, useEffect, useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, StyleSheet } from "react-native";
import AuthContext from "./contexts/AuthContext";
import { colors } from "./styleConfig";
import Splash from "./Splash/Splash";
import Login from "./Login/Login";
import Home from "./Home/Home";
import BodyText from "./components/BodyText";

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
    // We haven't finished checking for the token yet
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

    // No token found, user isn't signed in
    if (authState.userToken == null) {
      return (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "Log in",
            // When logging out, a pop animation feels intuitive
            animationTypeForReplace: authState.isSignout ? "pop" : "push",
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
    authState.isLoadingToken,
    authState.isSignout,
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
