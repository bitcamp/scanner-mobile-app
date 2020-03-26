import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";
import Screen from "../components/Screen";
import Title from "../components/Title";
import { fetchEvents, attendEvent } from "../actions/EventSignIn";
import { baseStyles, textStyles } from "../styleConfig";
import TextButton from "../components/TextButton";
import EventPicker, { placeholderText } from "./EventPicker";
import EventLoader from "./EventLoader";
import NfcScanDirections from "../components/NfcScanDirections";

/**
 * The screen for signing users into events by scanning their NFC wristband
 */
export default function EventSignIn() {
  const [eventsLoaded, setEventsLoaded] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(placeholderText);
  const [events, setEvents] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  /**
   * Attempts to get the events list, and adjusts the component state accordingly
   */
  const getEvents = useCallback(async () => {
    setEvents([]);
    setEventsLoaded(null);
    setFetchError(null);

    try {
      setEvents(await fetchEvents());
      setEventsLoaded(true);
    } catch (e) {
      setEventsLoaded(false);
      setFetchError(e);
    }
  }, []);

  /**
   * Fetch the events list when this component renders
   */
  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return eventsLoaded ? (
    <Screen style={styles.containerStyle}>
      <Title style={styles.title}>Event Sign In</Title>
      <EventPicker
        events={events}
        selectedEvent={selectedEvent}
        onEventSelection={setSelectedEvent}
      />
      <NfcScanDirections
        scannerIsActive={selectedEvent !== placeholderText}
        inactiveText="Please choose an event from the dropdown above"
      />
      <TextButton
        onPress={() => attendEvent("TODO: PUT NFC CODE HERE", selectedEvent)}
        disabled={selectedEvent === placeholderText}
      >
        Scan Wristband
      </TextButton>
    </Screen>
  ) : (
    <EventLoader
      error={fetchError}
      loadingState={eventsLoaded}
      onReload={getEvents}
    />
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
