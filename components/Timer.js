import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const BORDER_WIDTH = 6;

const Timer = ({ radius: outerRadius = 100 }) => {
  const innerRadius = outerRadius - BORDER_WIDTH;
  const outerDiameter = outerRadius * 2;
  const innerDiameter = innerRadius * 2;
  return (
    <View style={styles.container}>
      <View style={{ ...styles.timerOuterCircle, width: outerDiameter, height: outerDiameter, borderRadius: outerRadius }} />
      <View style={{ ...styles.timerInnerCircle, width: innerDiameter, height: innerDiameter, borderRadius: innerDiameter }} />
      <View style={styles.timeTextContainer}>
        <Text style={styles.timeText}>15:00</Text>
      </View>
      
    </View>
  );
};

Timer.propTypes = {
  radius: PropTypes.number,
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
});

export default Timer;