import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import Screen from "../components/Screen";
import Title from "../components/Title";
import { fetchEvents, attendEvent } from "../actions/EventSignIn";
import { baseStyles } from "../styleConfig";
import TextButton from "../components/TextButton";
import EventPicker, { placeholderId } from "./EventPicker";
import ScanningDirections from "./ScanningDirections";
import EventLoader from "./EventLoader";

/**
 * The screen for signing users into events by scanning their NFC wristband
 */
export default function EventSignIn() {
  const [eventsLoaded, setEventsLoaded] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(placeholderId);
  const [events, setEvents] = useState([]);
  const [fetchError, setFetchError] = useState(null);

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
        setFetchError(e);
      }
    };

    getEvents();
  });

  return eventsLoaded ? (
    <Screen style={styles.containerStyle}>
      <Title style={styles.title}>Event Sign In</Title>
      <EventPicker
        events={events}
        selectedEvent={selectedEvent}
        onEventSelection={setSelectedEvent}
      />
      <ScanningDirections />
      <TextButton
        onPress={() => attendEvent("TODO: PUT NFC CODE HERE", selectedEvent)}
        disabled={selectedEvent === placeholderId}
      >
        Scan Wristband
      </TextButton>
    </Screen>
  ) : (
    <EventLoader error={fetchError} loadingState={eventsLoaded} />
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: baseStyles.spacing,
  },
  title: {
    padding: 0,
    paddingBottom: baseStyles.spacing,
  },
});
