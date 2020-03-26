import React from "react";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ViewPropTypes, View, StyleSheet, Text } from "react-native";
import BaseButton from "./BaseButton";
import BodyText from "./BodyText";
import { baseStyles } from "../styleConfig";

/**
 * A button that contains an icon, and optionally some text (as children)
 */
function IconButton({
  children,
  containerStyle,
  iconName,
  iconStyle,
  onPress,
  disabled,
}) {
  return (
    <BaseButton
      onPress={onPress}
      containerStyle={containerStyle}
      disabled={disabled}
    >
      <View style={styles.contentContainer}>
        <Icon
          name={iconName}
          style={[styles.icon, iconStyle]}
          size={baseStyles.iconSize}
        />
        <BodyText light>{children}</BodyText>
      </View>
    </BaseButton>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    marginRight: baseStyles.spacing / 2,
  },
});

IconButton.propTypes = {
  children: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  iconName: PropTypes.string.isRequired,
  iconStyle: Text.propTypes.style,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

IconButton.defaultProps = {
  children: "",
  containerStyle: null,
  iconStyle: null,
  disabled: false,
};

export default IconButton;
