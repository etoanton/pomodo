import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, TouchableOpacity, Text, View,
} from 'react-native';

import { DOT_SIZE } from '../config';
import { calculateFrameSizes } from '../helpers';
import Indicator from './Indicator';

const { offsetBetweenDots } = calculateFrameSizes();

const Dot = ({
  type,
  dayIndex,
  completedCount,
  onPress,
}) => {
  if (type === 'separator') {
    return (
      <View style={styles.separatorContainer}>
        <Text style={styles.separatorTitle}>MAY</Text>
        <View style={styles.separatorDot} />
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => onPress(dayIndex)}
    >
      <Indicator count={completedCount} />
    </TouchableOpacity>
  );
};

Dot.propTypes = {
  dayIndex: PropTypes.number.isRequired,
  isToday: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  completedCount: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#27272E',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    marginRight: offsetBetweenDots,
  },
  separatorContainer: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    marginRight: offsetBetweenDots,
    borderRadius: DOT_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separatorTitle: {
    fontSize: 10,
    color: '#717182',
  },
  separatorDot: {
    width: DOT_SIZE / 4,
    height: DOT_SIZE / 4,
    borderRadius: (DOT_SIZE / 4) / 2,
    backgroundColor: '#717182',
  },
});

export default Dot;
