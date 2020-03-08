import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import RNPickerSelect from "react-native-picker-select";
import { colors, baseStyles, textStyles } from "../styleConfig";
import { DownArrow } from "../components/Icons";

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
          onValueChange={eventChoice => onEventSelection(eventChoice)}
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
      <DownArrow style={styles.expandIcon} />
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
  expandIcon: {
    paddingRight: baseStyles.spacing / 2,
  },
  inputContainer: {
    flex: 1,
  },
  picker: {
    color: colors.darkText,
    fontSize: textStyles.medium,
    textAlign: "left",
  },
  pickerContainer: {
    alignItems: "center",
    borderColor: colors.inputBorder,
    borderRadius: baseStyles.borderRadius,
    borderWidth: baseStyles.borderWidth,
    flexDirection: "row",
    marginBottom: baseStyles.spacing / 2,
  },
  placeholder: {
    color: colors.disabled,
  },
});
