import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import * as yup from "yup";
import AuthContext from "../contexts/AuthContext";
import Screen from "../components/Screen";
import TextButton from "../components/TextButton";
import { colors, baseStyles, textStyles } from "../styleConfig";
import BodyText from "../components/BodyText";

/**
 * The schema for the login data
 */
const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Not a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

/**
 * The screen where organizers can log into the app
 */
export default function Login() {
  const { authAPI } = useContext(AuthContext);

  return (
    <Screen title="Login">
      <Formik
        initialValues={{ email: "", password: "" }}
        initialErrors={{
          email: "Email is required",
          password: "Password is required",
        }}
        onSubmit={({ email, password }) => authAPI.signIn(email, password)}
        validationSchema={LoginSchema}
        validateOnMount
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.keyboardDismisser}
            contentContainerStyle={styles.formContainer}
          >
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                placeholder="E-mail"
              />
              <BodyText
                style={[
                  styles.error,
                  touched.email && errors.email && styles.visible,
                ]}
              >
                {errors.email}
              </BodyText>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                placeholder="··········"
                secureTextEntry
              />
              <BodyText
                style={[
                  styles.error,
                  touched.password && errors.password && styles.visible,
                ]}
              >
                {errors.password}
              </BodyText>
            </View>
            <TextButton onPress={handleSubmit} disabled={!isValid}>
              Log In
            </TextButton>
          </ScrollView>
        )}
      </Formik>
    </Screen>
  );
}

const styles = StyleSheet.create({
  error: {
    color: colors.invisible,
    fontSize: textStyles.error,
    paddingTop: baseStyles.spacing / 4,
  },
  formContainer: {
    alignItems: "stretch",
    flex: 1,
    padding: baseStyles.spacing,
  },
  input: {
    borderColor: colors.inputBorder,
    borderRadius: baseStyles.borderRadius,
    borderWidth: 2,
    fontSize: 16,
    padding: baseStyles.spacing / 2,
  },
  inputContainer: {
    paddingBottom: baseStyles.spacing / 2,
  },
  keyboardDismisser: {
    alignSelf: "stretch",
  },
  visible: {
    color: colors.error,
  },
});
