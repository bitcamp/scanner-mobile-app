import React from "react";
import { View, Picker, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { colors, baseStyles } from "../styleConfig";

/**
 * A dialog to select the event to which users are signing in
 */
export default function EventPicker({
  events,
  selectedEvent,
  onEventSelection,
}) {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedEvent}
        onValueChange={eventChoice => onEventSelection(eventChoice)}
      >
        <Picker.Item label="Select an event" value={placeholderId} />
        {// TODO: figure out actual data format and filter based on current time
        events[0][1].map(({ title, eventID }) => (
          <Picker.Item label={title} value={eventID} key={eventID} />
        ))}
      </Picker>
    </View>
  );
}

/**
 * The id for the item that displays when no event is currently selected
 */
export const placeholderId = "placeholder";

// Useful proptype definitions that are reused
const idType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
const eventType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  eventID: idType.isRequired,
});

EventPicker.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOf(eventType, PropTypes.string))
  ).isRequired,
  selectedEvent: idType.isRequired,
  onEventSelection: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  pickerContainer: {
    borderColor: colors.inputBorder,
    borderRadius: baseStyles.borderRadius,
    borderWidth: baseStyles.borderWidth,
    marginBottom: baseStyles.spacing / 2,
  },
});
