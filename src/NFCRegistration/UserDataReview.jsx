import React, { useContext } from "react";
import { Text, Button, StyleSheet, View } from "react-native";
import RegistrationPage from "./RegistrationPage";
import RegistrationContext, {
  registrationPages,
  registrationActions,
} from "../contexts/RegistrationContext";
import { colors } from "../styleConfig";

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
      {/* TODO: make a better user display */}
      {userData && (
        <View>
          <Text>Is this {userData.name}?</Text>
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
