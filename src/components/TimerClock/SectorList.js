import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import PropTypes from 'prop-types';

import { TIMER_STATUSES } from '../../state/Timer';

const getLengthes = ({ completed, radius }) => {
  const circleLength = 2 * Math.PI * radius;
  const completedLength = (circleLength * completed);
  const transparentLength = circleLength - completedLength;

  // completedLength + transparentLength = circleLength
  return `${completedLength} ${transparentLength}`;
};

const TOTAL_COMPLETED = 0.75;

const SectorList = ({ status, radius, completed }) => {
  const strokeWidth = 20;

  const containerWidth = radius * 2 + strokeWidth;
  const containerHeight = radius * 2 + strokeWidth;

  const circleLength = 2 * Math.PI * radius;
  const startFrom = -(circleLength * 3) / 4; // start from 12 hours

  const isTimerStarted = status === TIMER_STATUSES.STARTED || status === TIMER_STATUSES.PAUSED;
  const backgroundColor = isTimerStarted ? '#cca947' : 'rgba(255, 255, 255, 0.5)';

  return (
    <View style={styles.container}>
      <Svg height={containerHeight} width={containerWidth}>
        {/* background */}
        <Circle
          cx={radius + (strokeWidth / 2)}
          cy={radius + (strokeWidth / 2)}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDashoffset={startFrom}
          strokeDasharray={getLengthes({ radius, completed: TOTAL_COMPLETED })}
          strokeLinecap="round"
        />

        {/* progress */}
        {isTimerStarted && (
          <Circle
            cx={radius + (strokeWidth / 2)}
            cy={radius + (strokeWidth / 2)}
            r={radius}
            stroke="#437a66"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDashoffset={startFrom}
            strokeDasharray={getLengthes({ radius, completed: completed * TOTAL_COMPLETED })}
            strokeLinecap="round"
          />
        )}
      </Svg>
    </View>
  );
};

SectorList.propTypes = {
  radius: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
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
    zIndex: -5,
    // backgroundColor: 'red',
  },
});

export default SectorList;
