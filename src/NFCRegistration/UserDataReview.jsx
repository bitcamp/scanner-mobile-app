import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import RegistrationPage from "./RegistrationPage";
import RegistrationContext, {
  registrationPages,
  confirmUserData,
} from "../contexts/RegistrationContext";
import { baseStyles, textStyles } from "../styleConfig";
import BodyText from "../components/BodyText";
import RejectAcceptButtons from "./RejectAcceptButtons";

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
          <RejectAcceptButtons
            acceptAction={() => dispatch({ type: confirmUserData })}
            acceptText="Yes"
            rejectText="No"
          />
        </View>
      )}
    </RegistrationPage>
  );
}

const styles = StyleSheet.create({
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
