/* eslint-disable import/prefer-default-export */
// TODO: remove the default import comment once there are more icons
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";
import { Text } from "react-native";
import { colors, baseStyles } from "../styleConfig";

export function DownArrow({ size, color, style }) {
  return <Icon name="chevron-down" size={size} color={color} style={style} />;
}

const iconPropTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  style: Text.propTypes.style,
};

const defaultIconProps = {
  size: baseStyles.iconSize,
  color: colors.darkText,
  style: null,
};

DownArrow.propTypes = iconPropTypes;
DownArrow.defaultProps = defaultIconProps;
