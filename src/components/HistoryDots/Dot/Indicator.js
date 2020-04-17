import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import { DOT_SIZE } from '../config';

const MAX_COUNT = 5;
const BORDER_SIZE = 1;
const STEP = (DOT_SIZE - BORDER_SIZE) / MAX_COUNT;

const calculateInnerItemStyles = idx => {
  const size = STEP * (idx + 1);

  return {
    width: size,
    height: size,
    borderRadius: size / 2,
  };
};

const Indicator = ({ count }) => {
  if (count === 0) return null;

  const items = Array(Math.min(count, MAX_COUNT)).fill(0);

  return (
    <View style={styles.indicatorContainer}>
      {items.map((_, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <View style={{ ...styles.innerContainer, zIndex: (100 - idx) }} key={`key_${idx}`}>
          <View style={{
            ...styles.innerItem,
            ...calculateInnerItemStyles(idx),
          }}
          />
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
    backgroundColor: '#313138',
    borderColor: '#797982',
    borderWidth: 1,
  },
});

export default Indicator;
