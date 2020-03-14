/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import { getFormattedTimerValue } from '../../utils/dateTooklit';

const FormattedTextInfo = ({ timerValue, taskLisk, activeTimerItemIdx }) => {
  const minSec = getFormattedTimerValue(timerValue);

  const activeItem = taskLisk[activeTimerItemIdx];
  const stateLabel = activeItem ? activeItem.label : 'Not started';

  const progressDots = Array(taskLisk.length).fill(0).map((_, idx) => {
    if (activeTimerItemIdx < idx) {
      return (
        <View key={idx} style={styles.dotItem} />
      );
    }
    if (activeTimerItemIdx === idx) {
      return (
        <View key={idx} style={{ ...styles.dotItem, ...styles.activeDotItem }} />
      );
    }

    return (
      <View key={idx} style={{ ...styles.dotItem, ...styles.completedDotItem }} />
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.stateContainer}>
        <Text style={styles.stateText}>{stateLabel}</Text>
      </View>
      <View style={styles.timeTextContainer}>
        <Text style={styles.timeText}>{minSec}</Text>
      </View>
      <View style={styles.progressDotsContainer}>
        {progressDots}
      </View>
    </View>
  );
};

FormattedTextInfo.propTypes = {
  timerValue: PropTypes.number.isRequired,
  taskLisk: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      startedAt: PropTypes.string.isRequired,
      finishedAt: PropTypes.string.isRequired,
      timeCompleted: PropTypes.number.isRequired,
      timeTotal: PropTypes.number.isRequired,

    }),
  ).isRequired,
  activeTimerItemIdx: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stateContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 5,
  },
  stateText: {
    color: '#fff',
    fontSize: 12,
  },
  timeTextContainer: {},
  timeText: {
    color: '#ffffff',
    fontSize: 32,
    letterSpacing: 0.8,
    fontWeight: '400',
  },
  progressDotsContainer: {
    marginTop: 7,
    flexDirection: 'row',
  },
  dotItem: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 3,
  },
  activeDotItem: {
    backgroundColor: '#598F5F',
  },
  completedDotItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default FormattedTextInfo;
