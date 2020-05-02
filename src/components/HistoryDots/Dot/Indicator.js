import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import { DOT_SIZE } from '../config';

const MAX_COUNT = 5;
const STEP_OFFSET = 1.5;
const SINGLE_CIRCLE_SIZE = (DOT_SIZE / MAX_COUNT) - STEP_OFFSET;

const COMPLETED_COLORS = ['#709963', '#618a55', '#48703b', '#385c2c', '#274a1b'];

const calculateInnerItemStyles = idx => {
  const diameter = SINGLE_CIRCLE_SIZE * (idx + 1);

  return {
    width: diameter + STEP_OFFSET * (idx + 1),
    height: diameter + STEP_OFFSET * (idx + 1),
    borderRadius: (diameter + STEP_OFFSET * idx) / 2,
    backgroundColor: COMPLETED_COLORS[idx],
  };
};

const Indicator = ({ count }) => {
  if (count === 0) return null;

  const items = Array(Math.min(count, MAX_COUNT)).fill(0);

  return (
    <View style={styles.indicatorContainer}>
      {items.map((_, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <View style={{ ...styles.innerContainer, zIndex: (MAX_COUNT - idx) }} key={`key_${idx}`}>
          <View style={calculateInnerItemStyles(idx)} />
        </View>
      ))}
    </View>
  );
};


Indicator.propTypes = {
  count: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  indicatorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerItem: {
    // borderColor: '#797982',
    // borderWidth: 1,
  },
});

export default Indicator;
