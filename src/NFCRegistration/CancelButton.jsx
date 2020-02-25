import React, { useContext } from "react";
import { Button, View, StyleSheet } from "react-native";
import RegistrationContext, {
  registrationActions,
} from "../contexts/RegistrationContext";

/**
 * Allows you to go back to the starting page of the nfc
 * wristband registration process
 */
export default function CancelButton() {
  const { dispatch } = useContext(RegistrationContext);
  return (
    <View style={styles.container}>
      <Button
        title="Cancel"
        onPress={() => dispatch({ type: registrationActions.reset })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
