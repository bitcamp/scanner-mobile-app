import React, { useContext } from "react";
import { Button, StyleSheet, View } from "react-native";
import RegistrationPage from "./RegistrationPage";
import RegistrationContext, {
  registrationPages,
  registrationActions,
} from "../contexts/RegistrationContext";
import { colors } from "../styleConfig";
import BodyText from "../components/BodyText";

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
      {/* TODO: make a better user display once the backend response is finalized */}
      {userData && (
        <View>
          <BodyText>Is this {userData.name}?</BodyText>
          <View style={styles.buttonContainer}>
            <Button
              title="No"
              onPress={() => dispatch({ type: registrationActions.reset })}
            />
            <Button
              title="Yes"
              color={colors.primaryColor}
              onPress={() =>
                dispatch({ type: registrationActions.confirmUserData })
              }
            />
          </View>
        </View>
      )}
    </RegistrationPage>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});
