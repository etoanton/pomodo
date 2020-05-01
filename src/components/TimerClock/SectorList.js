import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import PropTypes from 'prop-types';

const BACKGROUND_COLOR = '#358560';

const getLengthes = ({ completed, radius }) => {
  const circleLength = 2 * Math.PI * radius;
  const completedLength = (circleLength * completed);
  const transparentLength = circleLength - completedLength;

  // completedLength + transparentLength = circleLength
  return `${completedLength} ${transparentLength}`;
};

const SectorList = ({ radius, completed }) => {
  const strokeWidth = 20;

  const containerWidth = radius * 2 + strokeWidth;
  const containerHeight = radius * 2 + strokeWidth;

  // const completed = 0.75;
  const circleLength = 2 * Math.PI * radius;
  const startFrom = -(circleLength * 3) / 4; // start from 12 hours

  return (
    <View style={styles.container}>
      <Svg height={containerHeight} width={containerWidth}>
        {/* background */}
        <Circle
          cx={radius + (strokeWidth / 2)}
          cy={radius + (strokeWidth / 2)}
          r={radius}
          stroke="#cca947"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDashoffset={startFrom}
          strokeDasharray={getLengthes({ radius, completed: 0.75 })}
          strokeLinecap="round"
        />

        <Circle
          cx={radius + (strokeWidth / 2)}
          cy={radius + (strokeWidth / 2)}
          r={radius}
          stroke="#437a66"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDashoffset={startFrom}
          strokeDasharray={getLengthes({ radius, completed: completed * 0.75 })}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

SectorList.propTypes = {
  radius: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
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
