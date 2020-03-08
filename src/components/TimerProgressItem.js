import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';

import { getFormattedTimerValue } from '../utils/dateTooklit';

const TimerProgressItem = ({
  isActive,
  label,
  timeTotal,
  timeCompleted,
}) => {
  const [completedA] = useState(new Animated.Value(0));

  const minSecTotal = getFormattedTimerValue(timeTotal);
  const minSecCompleted = getFormattedTimerValue(timeCompleted);
  const minSec = !isActive ? minSecTotal : `${minSecCompleted} / ${minSecTotal}`;

  // 0...100 %
  const completed = Math.round((timeCompleted / timeTotal) * 100);
  console.log('completed', completed);

  useEffect(() => {
    Animated.timing(
      completedA,
      {
        toValue: completed,
        duration: 500,
      },
    ).start();
  }, [completed]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.itemLabel}>{label}</Text>
        <Text style={styles.itemTime}>{minSec}</Text>
      </View>

      <Animated.View
        style={styles.backgroundUnderlay}
        width={completedA.interpolate({
          inputRange: [0, 100],
          outputRange: ['0%', '100%'],
        })}
      />
    </View>
  );
};

TimerProgressItem.propTypes = {
  isActive: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  timeTotal: PropTypes.number.isRequired,
  timeCompleted: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: '#2F2F38',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2.5,
  },
  contentContainer: {
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemLabel: {
    fontSize: 17,
    color: '#fff',
  },
  itemTime: {
    fontSize: 17,
    color: '#fff',
  },
  backgroundUnderlay: {
    zIndex: -1,
    position: 'absolute',
    backgroundColor: '#5C9961',
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: 8,
  },
});

export default TimerProgressItem;
