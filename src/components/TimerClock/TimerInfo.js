/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import { tasksListPropType } from '../../state/Timer';
import { getFormattedTimerValue } from '../../utils/dateTooklit';
import ProgressDots from './ProgressDots';

const TimerInfo = ({ timerValue, taskLisk, activeTimerItemIdx }) => {
  const minSec = getFormattedTimerValue(timerValue);

  const activeItem = taskLisk[activeTimerItemIdx];
  const stateLabel = activeItem ? activeItem.label : 'Not started';

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.stateContainer}>
          <Text style={styles.stateText}>{stateLabel}</Text>
        </View>
        <View style={styles.timeTextContainer}>
          <Text style={styles.timeText}>{minSec}</Text>
        </View>
        <View style={styles.progressDotsContainer}>
          <ProgressDots itemsCount={taskLisk.length} activeItemIdx={activeTimerItemIdx} />
        </View>
      </View>
    </View>
  );
};

TimerInfo.propTypes = {
  timerValue: PropTypes.number.isRequired,
  taskLisk: tasksListPropType.isRequired,
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
  contentContainer: {
    paddingBottom: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stateContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  stateText: {
    color: '#fafafa',
    fontSize: 12,
  },
  timeTextContainer: {
    paddingTop: 4,
    paddingBottom: 7,
  },
  timeText: {
    color: '#fff',
    fontSize: 32,
    letterSpacing: 0.8,
    fontWeight: '400',
  },
  progressDotsContainer: {
    flexDirection: 'row',
  },
  dotItem: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 3,
  },
  activeDotItem: {
    backgroundColor: '#fff',
  },
  completedDotItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default TimerInfo;
