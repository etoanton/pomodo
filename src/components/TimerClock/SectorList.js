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
const BACKGROUND_COLOR_DISABLED = '#2F2F38';
const BACKGROUND_COLOR_ACTIVE = '#bdbdbd';
const COMPLETED_COLOR = '#56947d';
const SECTOR_BACKGROUND_COLOR = '#26262D';
const LINES_STROKE_WIDTH = 10;
const SECTOR_STROKE_WIDTH = 100;

const SectorList = ({ status, radius, completed }) => {
  const linesRadius = radius;
  const sectorRadius = radius / 2;

  const containerSize = linesRadius * 2 + LINES_STROKE_WIDTH;

  const linesCircleLength = 2 * Math.PI * linesRadius;
  const linesStartFrom = -(linesCircleLength * 3) / 4;
  const sectorCircleLength = 2 * Math.PI * sectorRadius;
  const sectorStartFrom = -(sectorCircleLength * 3) / 4;

  const isTimerStarted = status === TIMER_STATUSES.STARTED || status === TIMER_STATUSES.PAUSED;
  const backgroundColor = isTimerStarted ? BACKGROUND_COLOR_ACTIVE : BACKGROUND_COLOR_DISABLED;

  return (
    <View style={styles.container}>
      <Svg height={containerSize} width={containerSize}>
        {/* sector progress */}
        {isTimerStarted && (
          <Circle
            cx={sectorRadius + (SECTOR_STROKE_WIDTH / 2)}
            cy={sectorRadius + (SECTOR_STROKE_WIDTH / 2)}
            r={sectorRadius}
            stroke={SECTOR_BACKGROUND_COLOR}
            strokeWidth={SECTOR_STROKE_WIDTH}
            fill="transparent"
            strokeDashoffset={sectorStartFrom}
            strokeDasharray={getLengthes({
              radius: sectorRadius,
              completed: completed * TOTAL_COMPLETED,
            })}
          />
        )}

        {/* line background */}
        <Circle
          cx={linesRadius + (LINES_STROKE_WIDTH / 2)}
          cy={linesRadius + (LINES_STROKE_WIDTH / 2)}
          r={linesRadius}
          stroke={backgroundColor}
          strokeWidth={LINES_STROKE_WIDTH}
          fill="transparent"
          strokeDashoffset={linesStartFrom}
          strokeDasharray={getLengthes({ radius: linesRadius, completed: TOTAL_COMPLETED })}
          strokeLinecap="round"
        />

        {/* line progress */}
        {isTimerStarted && (
          <Circle
            cx={linesRadius + (LINES_STROKE_WIDTH / 2)}
            cy={linesRadius + (LINES_STROKE_WIDTH / 2)}
            r={linesRadius}
            stroke={COMPLETED_COLOR}
            strokeWidth={LINES_STROKE_WIDTH}
            fill="transparent"
            strokeDashoffset={linesStartFrom}
            strokeDasharray={getLengthes({ radius: linesRadius, completed: completed * TOTAL_COMPLETED })}
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
