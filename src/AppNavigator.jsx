import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
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
  const getPrimaryScreen = () => {
    // Show a loading screen while fetching the token
    if (!authState || authState.isLoadingToken) {
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
            <View style={styles.logoutContainer}>
              <Icon.Button
                name={icons.logout}
                size={baseStyles.smallIconSize}
                color={colors.headerTint}
                backgroundColor={colors.invisible}
                onPress={authAPI.signOut}
                iconStyle={styles.logoutIcon}
              />
            </View>
          ),
        }}
      />
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Header headerProps={props} />,
      }}
    >
      {getPrimaryScreen()}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    marginRight: baseStyles.spacing / 4,
  },
  logoutIcon: {
    marginRight: 0,
  },
});
