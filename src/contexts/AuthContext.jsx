import React, { createContext, useMemo, useReducer } from "react";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-community/async-storage";
import Toast from "react-native-tiny-toast";
import logIn from "../actions/logIn";
import { IllegalArgumentError, getErrorMessage } from "../actions/errors";
import { toastOptions } from "../styleConfig";

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
            is: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            userToken: null,
          };
        default:
          throw new IllegalArgumentError(
            `Unhandled action type: ${action.type}`
          );
      }
    },
    {
      isLoadingToken: true,
      userToken: null,
      error: null,
    }
  );

  // These are the actions that screens can perform
  const authAPI = useMemo(
    () => ({
      signIn: async (username, password) => {
        try {
          // TODO: Send (username, password) to server and get a token
          const token = await logIn(username, password);
          AsyncStorage.setItem("userToken", token);
          dispatch({ type: "SIGN_IN", token });
        } catch (e) {
          Toast.show(getErrorMessage(e), toastOptions.error);
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
          // Restoring token failed
          userToken = null;
        }

        // Ends the process of loading the user token
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
