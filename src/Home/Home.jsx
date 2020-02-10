import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventScanner from "../EventScanner/EventScanner";
import RegistrationScanner from "../RegistrationScanner/RegistrationScanner";

const Tab = createBottomTabNavigator();

/**
 * The main screen of the app
 */
export default function Home() {
  return (
    <Tab.Navigator initialRouteName="Registration Scanner">
      <Tab.Screen
        name="Event Scanner"
        component={EventScanner}
        options={{ title: "Event Scanner" }}
      />
      <Tab.Screen
        name="Registration Scanner"
        component={RegistrationScanner}
        options={{ title: "Registration Scanner" }}
      />
    </Tab.Navigator>
  );
}
