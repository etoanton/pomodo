import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { DOT_SIZE } from '../config';
import { calculateFrameSizes } from '../helpers';
import Indicator from './Indicator';

const { offsetBetweenDots } = calculateFrameSizes();

const Dot = ({
  dayIndex,
  completedCount,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => onPress(dayIndex)}
  >
    <Indicator count={completedCount} />
  </TouchableOpacity>
);

Dot.propTypes = {
  dayIndex: PropTypes.number.isRequired,
  isToday: PropTypes.bool.isRequired,
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
});

export default Dot;
