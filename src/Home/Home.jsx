import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventSignIn from "../EventSignIn/EventSignIn";
import NFCRegistration from "../NFCRegistration/NFCRegistration";

const Tab = createBottomTabNavigator();

/**
 * The main screen of the app
 */
export default function Home() {
  return (
    <Tab.Navigator initialRouteName="Event Sign In">
      <Tab.Screen
        name="Event Sign In"
        component={EventSignIn}
        options={{ title: "Event Sign In" }}
      />
      <Tab.Screen
        name="NFC Registration"
        component={NFCRegistration}
        options={{ title: "NFC Registration" }}
      />
    </Tab.Navigator>
  );
}
