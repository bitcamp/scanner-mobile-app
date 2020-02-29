import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { colors } from "../styleConfig";

/**
 * A dark mask with a stylized transparent window in the center. Accepts components
 * to render above and below the transparent window.
 */
export default function QRViewFinder({ topView, bottomView }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>{topView}</View>
      <View style={[styles.row, styles.middleRow]}>
        <View style={styles.middleCell} />
        <View style={[styles.middleCell, styles.viewFinder]}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
        </View>
        <View style={styles.middleCell} />
      </View>
      <View style={styles.row}>{bottomView}</View>
    </View>
  );
}

QRViewFinder.propTypes = {
  // TODO: see if node is correct
  topView: PropTypes.node,
  bottomView: PropTypes.node,
};

QRViewFinder.defaultProps = {
  topView: null,
  bottomView: null,
};

const borderWidth = 2;

const styles = StyleSheet.create({
  bottomLeft: {
    borderRightWidth: 0,
    borderTopWidth: 0,
    bottom: -borderWidth,
    left: -borderWidth,
  },
  bottomRight: {
    borderLeftWidth: 0,
    borderTopWidth: 0,
    bottom: -borderWidth,
    right: -borderWidth,
  },
  container: {
    alignItems: "stretch",
    flex: 1,
  },
  corner: {
    borderColor: colors.viewFinderBorder,
    borderWidth,
    height: 20,
    position: "absolute",
    width: 20,
  },
  middleCell: {
    backgroundColor: colors.viewFinderMask,
    flex: 1,
    height: "100%",
  },
  middleRow: {
    alignItems: "center",
    backgroundColor: colors.viewFinderThroughHole,
    flexDirection: "row",
    flex: 3,
    zIndex: 2,
  },
  row: {
    backgroundColor: colors.viewFinderMask,
    flex: 2,
  },
  topLeft: {
    borderBottomWidth: 0,
    borderRightWidth: 0,
    left: -borderWidth,
    top: -borderWidth,
  },
  topRight: {
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    right: -borderWidth,
    top: -borderWidth,
  },
  viewFinder: {
    aspectRatio: 1,
    backgroundColor: colors.viewFinderThroughHole,
    flex: 0,
    maxHeight: 200,
    maxWidth: 200,
    zIndex: 2,
  },
});
