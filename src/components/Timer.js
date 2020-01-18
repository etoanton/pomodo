import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import TicksBackground from './TicksBackground';

const BORDER_WIDTH = 6;
const TICK_SIZE = 10;

const Timer = ({
  radius: outerRadius = 100,
  timerStarted,
  timerValue,
  togglePicker,
}) => {
  const innerRadius = outerRadius - BORDER_WIDTH;
  const outerDiameter = outerRadius * 2;
  const innerDiameter = innerRadius * 2;

  const tempMinutesV = Math.trunc(timerValue/60);
  const minutesV = tempMinutesV < 10 ? `0${tempMinutesV}` : tempMinutesV;
  const tempSecondsV = timerValue % 60;
  const secondsV = tempSecondsV < 10 ? `0${tempSecondsV}` : tempSecondsV;

  const ticksCircleRadius = outerRadius - BORDER_WIDTH * 2 - TICK_SIZE;

  return (
    <View style={styles.container}>
      <View style={{ ...styles.timerOuterCircle, width: outerDiameter, height: outerDiameter, borderRadius: outerRadius }} />
      <View style={{ ...styles.timerInnerCircle, width: innerDiameter, height: innerDiameter, borderRadius: innerDiameter }} />
      <View style={styles.timeTextContainer}>
        <TouchableOpacity
          disabled={timerStarted}
          onPress={() => togglePicker(true)}
        >
          <Text style={styles.timeText}>{`${minutesV}:${secondsV}`}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ticksBackgroundContainer}>
        <TicksBackground
          radius={ticksCircleRadius}
          tickSize={TICK_SIZE}
        />
      </View>
    </View>
  );
};

Timer.propTypes = {
  radius: PropTypes.number,
  timerStarted: PropTypes.bool.isRequired,
  timerValue: PropTypes.number.isRequired,
  togglePicker: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {},
  timerOuterCircle: {
    borderWidth: BORDER_WIDTH,
    borderColor: '#DDDDDD',
  },
  timerInnerCircle: {
    position: 'absolute',
    top: BORDER_WIDTH,
    left: BORDER_WIDTH,
    borderWidth: BORDER_WIDTH + 2,
    borderColor: '#2A2A33',
  },
  timeTextContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    color: '#ffffff',
    fontSize: 32,
    letterSpacing: 0.8,
    fontWeight: '400',
  },
  ticksBackgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
});

export default Timer;