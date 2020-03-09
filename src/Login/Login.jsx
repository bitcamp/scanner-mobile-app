import React, { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import AuthContext from "../contexts/AuthContext";
import Screen from "../components/Screen";
import { colors } from "../styleConfig";
import LoginSchema from "../models/LoginSchema";

// TODO: Swap to better button and text components

/**
 * The screen where organizers can log into the app
 */
export default function Login() {
  const { authAPI } = useContext(AuthContext);
  return (
    <Screen title="Login">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={authAPI.signIn}
        validationSchema={LoginSchema}
      >
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
              placeholder="E-mail"
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
            <TextInput
              style={styles.input}
              value={values.password}
              onChangeText={handleChange("password")}
              placeholder="·····"
              onBlur={() => setFieldTouched("password")}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            {// TODO: replace with better button with a disabled param eventually
            isValid && (
              <Button
                onPress={handleSubmit}
                title="Click me!"
                color={colors.primaryColor}
              />
            )}
          </View>
        )}
      </Formik>
    </Screen>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 10,
  },
  formContainer: {
    alignItems: "stretch",
    flex: 1,
  },
  input: {
    borderColor: "#000",
    borderWidth: 2,
    fontSize: 16,
  },
});
