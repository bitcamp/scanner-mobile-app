import React, { useContext, useEffect, useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import AuthContext from "./contexts/AuthContext";
import { colors } from "./styleConfig";
import Splash from "./Splash/Splash";
import Login from "./Login/Login";
import Home from "./Home/Home";

const Stack = createNativeStackNavigator();

/** The app's primary stack navigator */
export default function AppNavigator() {
  const { authState, authAPI } = useContext(AuthContext);

  // Fetch the user token when the app loads
  useEffect(() => {
    authAPI.fetchUserToken();
  }, [authAPI]);

  const getPrimaryScreen = useMemo(() => {
    if (authState.isLoadingToken) {
      // We haven't finished checking for the token yet
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
    if (authState.userToken == null) {
      // No token found, user isn't signed in
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
              <Text style={styles.logout}>Log Out</Text>
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
          backgroundColor: colors.primaryColor,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          color: colors.darkBGTextColor,
        },
      }}
    >
      {getPrimaryScreen}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  logout: {
    color: colors.darkBGTextColor,
    marginRight: 10,
  },
});
