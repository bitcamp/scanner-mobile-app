import React from "react";
import PropTypes from "prop-types";
import { View, Image, StyleSheet } from "react-native";
import { images, colors, baseStyles } from "../styleConfig";

/**
 * Serves as a stand-in for React Navigation's Stack Navigator header. Currently,
 * it only supports the `headerRight` prop.
 */
function Header({ headerProps }) {
  // Extract the needed header props passed in from React Navigation
  const { headerRight } = headerProps.scene.descriptor.options;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Image source={images.headerLogo.source} style={styles.logo} />
      </View>
      {headerRight && headerRight()}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    backgroundColor: colors.headerBackground,
    flexDirection: "row",
    flexWrap: "nowrap",
    height: 60,
  },
  logo: {
    aspectRatio: images.headerLogo.aspectRatio,
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    padding: baseStyles.spacing / 2,
  },
});

Header.propTypes = {
  headerProps: PropTypes.shape({
    scene: PropTypes.shape({
      descriptor: PropTypes.shape({
        options: PropTypes.shape({
          headerRight: PropTypes.func,
        }),
      }),
    }),
  }),
};

Header.defaultProps = {
  headerProps: {
    scene: {
      descriptor: {
        options: {
          headerRight: null,
        },
      },
    },
  },
};

export default Header;
