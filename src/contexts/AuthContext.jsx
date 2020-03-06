import React, { createContext, useMemo, useReducer } from "react";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-community/async-storage";

// Holds info on a user's login status for the entire app
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Define all the ways to mutate the app's state:
  // 1. Restore token (try to fetch the old token)
  // 2. Sign in (signs the user into the app)
  // 3. Sign out (signs the user out of the app)
  const [authState, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoadingToken: false,
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
      isLoadingToken: true,
      isSignout: false,
      userToken: null,
    }
  );

  // These are the actions that screens can perform
  const authAPI = useMemo(
    () => ({
      signIn: async () => {
        // TODO: Send (username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        try {
          const token = "dummy-auth-token";
          AsyncStorage.setItem("userToken", token);
          dispatch({ type: "SIGN_IN", token });
        } catch (e) {
          // Catch errors while signing in
        }
      },
      signOut: () => {
        AsyncStorage.removeItem("userToken").then(() =>
          dispatch({ type: "SIGN_OUT" })
        );
      },
      fetchUserToken: async () => {
        let userToken;

        try {
          userToken = await AsyncStorage.getItem("userToken");
        } catch (e) {
          // Restoring token failed (so userToken will stay null)
        }

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        dispatch({ type: "RESTORE_TOKEN", token: userToken });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={{ authAPI, authState }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
