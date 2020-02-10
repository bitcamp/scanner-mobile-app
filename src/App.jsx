import React, { useReducer, useMemo, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-community/async-storage";
import { enableScreens } from "react-native-screens";
import { colors } from "./styleConfig";
import Splash from "./Splash/Splash";
import Login from "./Login/Login";
import Home from "./Home/Home";
import AuthContext from "./contexts/AuthContext";

// This is an optimization that improves performance with multi-screen apps
enableScreens();

// The app's main stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  // Define all the ways to mutate the app's state:
  // 1. Restore token (try to fetch the old token)
  // 2. Sign in (signs the user into the app)
  // 3. Sign out (signs the user out of the app)
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: undefined,
          };
        default:
          return {
            ...prevState,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to the appropriate place
    const fetchUserToken = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        // Restoring token failed (so userToken will stay null)
      }

      // After restoring the token, we may need to validate it

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    fetchUserToken();
  }, []);

  // These are the actions that screens can perform
  const authContext = useMemo(
    () => ({
      signIn: async () => {
        // TODO: Send (username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
    }),
    []
  );

  const mainScreen =
    state.userToken === null ? (
      // No token found, user isn't signed in
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Log in",
          // When logging out, a pop animation feels intuitive
          animationTypeForReplace: state.isSignout ? "pop" : "push",
        }}
      />
    ) : (
      // User is signed in
      <Stack.Screen name="Home" component={Home} />
    );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.primaryColor,
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
              color: colors.darkBGTextColor,
            },
          }}
        >
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{
                headerShown: false,
              }}
            />
          ) : (
            mainScreen
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
