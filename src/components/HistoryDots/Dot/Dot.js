import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, TouchableOpacity, Text, View,
} from 'react-native';

import { BACKGROUND_DARK_COLOR } from '../../../styles/colors';
import { DOT_SIZE } from '../config';
import { calculateFrameSizes } from '../helpers';
import Indicator from './Indicator';

const { offsetBetweenDots } = calculateFrameSizes();

const MONTHES = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const Dot = ({
  type,
  dayIndex,
  monthIndex,
  completedCount,
  onPress,
}) => {
  if (type === 'separator') {
    return (
      <View style={styles.separatorContainer}>
        <Text style={styles.separatorTitle}>{MONTHES[monthIndex]}</Text>
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

Dot.defaultProps = {
  dayIndex: -1,
  monthIndex: -1,
  completedCount: 0,
};

Dot.propTypes = {
  dayIndex: PropTypes.number,
  monthIndex: PropTypes.number,
  // isToday: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  completedCount: PropTypes.number,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: BACKGROUND_DARK_COLOR,
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
    marginTop: 3,
  },
});

export default Dot;
