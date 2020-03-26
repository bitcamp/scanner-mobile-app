import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import RegistrationPage from "./RegistrationPage";
import RegistrationContext, {
  registrationPages,
  reset,
  confirmUserData,
} from "../contexts/RegistrationContext";
import { colors, baseStyles, textStyles } from "../styleConfig";
import BodyText from "../components/BodyText";
import TextButton from "../components/TextButton";

/**
 * A detailed summary of a user's data
 */
export default function UserDataReview() {
  const {
    state: { userData },
    dispatch,
  } = useContext(RegistrationContext);

  return (
    <RegistrationPage title={registrationPages.userDataReview}>
      {userData && (
        <View style={styles.page}>
          <BodyText style={styles.userData}>Is this {userData.name}?</BodyText>
          <View style={styles.buttonContainer}>
            <TextButton
              onPress={() => dispatch({ type: reset })}
              containerStyle={[styles.button, styles.cancelButton]}
            >
              No
            </TextButton>
            <TextButton
              color={colors.primary}
              onPress={() => dispatch({ type: confirmUserData })}
              containerStyle={styles.button}
            >
              Yes
            </TextButton>
          </View>
        </View>
      )}
    </RegistrationPage>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginHorizontal: baseStyles.spacing / 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    padding: baseStyles.spacing,
  },
  cancelButton: {
    backgroundColor: colors.cancel,
    borderColor: colors.primary,
    borderWidth: baseStyles.borderWidth,
    overflow: "visible",
  },
  page: {
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "space-between",
  },
  userData: {
    fontSize: textStyles.medium,
    padding: baseStyles.spacing,
    textAlign: "center",
  },
});
