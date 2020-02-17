import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

/**
 * A full page screen meant as a stand-in for actual components in the future
 * TODO: delete this file when actual screens are created
 */
export default function Screen({ title, children }) {
  return (
    <View style={styles.fullScreen}>
      <Text style={styles.screenTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  screenTitle: {
    fontSize: 20,
    textAlign: "center",
  },
});

Screen.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Screen.defaultProps = {
  children: null,
};
