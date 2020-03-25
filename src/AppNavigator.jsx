import React, { useContext, useEffect, useMemo } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AuthContext from "./contexts/AuthContext";
import { colors, baseStyles, icons } from "./styleConfig";
import Splash from "./Splash/Splash";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Header from "./components/Header";

const Stack = createStackNavigator();

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
          options={{ headerShown: false }}
        />
      );
    }

    // No there is no error and no token, the user isn't signed in
    if (authState.userToken === null) {
      return <Stack.Screen name="Login" component={Login} />;
    }

    // User is signed in
    return (
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => (
            <Icon.Button
              name={icons.logout}
              size={baseStyles.smallIconSize}
              color={colors.headerTint}
              backgroundColor={colors.invisible}
              onPress={authAPI.signOut}
              style={styles.logout}
              iconStyle={styles.logoutIcon}
            />
          ),
        }}
      />
    );
  }, [authAPI.signOut, authState.isLoadingToken, authState.userToken]);

  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <Header headerProps={props} />,
      }}
    >
      {primaryScreen}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  logoutIcon: {
    marginRight: 0,
  },
});
