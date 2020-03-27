import React from "react";
import { View, StyleSheet, YellowBox } from "react-native";
import PropTypes from "prop-types";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, baseStyles, textStyles, icons } from "../styleConfig";

// TODO: Stop ignoring this warning once RNPickerSelect migrates to
// `@react-native-community/picker`
YellowBox.ignoreWarnings(["Picker has been extracted from react-native core"]);

/**
 * A dialog to select the event to which users are signing in
 */
export default function EventPicker({
  selectedEvent,
  events,
  onEventSelection,
}) {
  return (
    <View style={styles.pickerContainer}>
      <View style={styles.inputContainer}>
        <RNPickerSelect
          onValueChange={(eventChoice) => onEventSelection(eventChoice)}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: placeholderText,
            value: placeholderText,
            color: colors.disabled,
          }}
          items={events[0][1].map(({ title, eventID }) => ({
            label: title,
            value: eventID,
          }))}
          textInputProps={{
            style: [
              styles.picker,
              selectedEvent === placeholderText && styles.placeholder,
            ],
            numberOfLines: 1,
          }}
        />
      </View>
      <Icon name={icons.eventSelector} size={baseStyles.iconSize} />
    </View>
  );
}

/**
 * The label for the placeholder text
 */
export const placeholderText = "Select an event...";

// Useful proptype definitions that are reused
const idType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
const eventType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  eventID: idType.isRequired,
});

EventPicker.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.arrayOf(eventType), PropTypes.string])
    )
  ).isRequired,
  selectedEvent: idType.isRequired,
  onEventSelection: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
  },
  picker: {
    color: colors.darkText,
    fontSize: textStyles.medium,
    height: 50,
    textAlign: "left",
  },
  pickerContainer: {
    alignItems: "center",
    borderColor: colors.inputBorder,
    borderRadius: baseStyles.borderRadius,
    borderWidth: baseStyles.borderWidth,
    flexDirection: "row",
    marginBottom: baseStyles.spacing / 2,
    paddingHorizontal: baseStyles.spacing / 2,
  },
  placeholder: {
    color: colors.disabled,
  },
});
