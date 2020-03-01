import React, { useState, useEffect } from "react";
import { Picker, StyleSheet, View, FlatList } from "react-native";
import Screen from "../components/Screen";
import Title from "../components/Title";
import BodyText from "../components/BodyText";
import { fetchEvents, attendEvent } from "../actions/EventSignIn";
import { colors, baseStyles, textStyles } from "../styleConfig";
import Splash from "../Splash/Splash";
import TextButton from "../components/TextButton";

/**
 * The screen for signing users into events by scanning their NFC wristband
 */
export default function EventSignIn() {
  const [eventsLoaded, setEventsLoaded] = useState(null);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const directions = [
    "Select an event from the dropdown above",
    'Tap the "Scan Wristband" button',
    "Place the wristband underneath your phone",
    "The user will be signed in!",
  ];

  /**
   * Fetch the events list when this component renders
   */
  useEffect(() => {
    const getEvents = async () => {
      try {
        // TODO: replace with actual fetch call
        setEvents(await fetchEvents());
        setEventsLoaded(true);
      } catch (e) {
        // TODO: add in error validation
        setEventsLoaded(false);
      }
    };

    getEvents();
  });

  return eventsLoaded ? (
    <Screen style={styles.containerStyle}>
      <Title style={styles.title}>Event Sign In</Title>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={event}
          onValueChange={eventChoice => setEvent(eventChoice)}
        >
          {!event && <Picker.Item label="Select an event" value="Default" />}
          {// TODO: figure out actual data format and filter based on current time
          events[0][1].map(({ title, eventID }) => (
            <Picker.Item label={title} value={eventID} key={eventID} />
          ))}
        </Picker>
      </View>
      <FlatList
        data={directions}
        renderItem={({ item: direction, index }) => (
          <View style={styles.directionContainer}>
            <BodyText style={styles.directionNumber}>
              {`${index + 1}.`}
            </BodyText>
            <BodyText style={styles.direction}>{direction}</BodyText>
          </View>
        )}
        keyExtractor={item => item}
      />
      <TextButton
        onPress={() => attendEvent("TODO: PUT NFC CODE HERE", event)}
        disabled={!event}
      >
        Scan Wristband
      </TextButton>
    </Screen>
  ) : (
    <Splash />
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: baseStyles.spacing,
  },
  direction: {
    flexShrink: 1,
    fontSize: textStyles.medium,
  },
  directionContainer: {
    flexDirection: "row",
    flex: 1,
    paddingVertical: baseStyles.spacing / 2,
  },
  directionNumber: {
    fontSize: textStyles.medium,
    fontWeight: "bold",
    marginRight: baseStyles.spacing / 2,
  },
  pickerContainer: {
    borderColor: colors.inputBorder,
    borderRadius: baseStyles.borderRadius,
    borderWidth: baseStyles.borderWidth,
    marginBottom: baseStyles.spacing / 2,
  },
  title: {
    padding: 0,
    paddingBottom: baseStyles.spacing,
  },
});
