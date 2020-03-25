import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EventSignIn from "../EventSignIn/EventSignIn";
import NFCRegistration from "../NFCRegistration/NFCRegistration";
import { colors, icons } from "../styleConfig";

const Tab = createBottomTabNavigator();

/**
 * The main screen of the app
 */
export default function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Event Sign In"
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.disabled,
      }}
      screenOptions={({ route }) => ({
        // Disable icon prop validation (since these props are guaranteed by React Navigation)
        // eslint-disable-next-line react/prop-types
        tabBarIcon: ({ size, color }) => (
          <Icon name={icons[route.name]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Event Sign In" component={EventSignIn} />
      <Tab.Screen name="Check In" component={NFCRegistration} />
    </Tab.Navigator>
  );
}
