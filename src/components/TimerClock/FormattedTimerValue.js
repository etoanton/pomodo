import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import { getFormattedTimerValue } from '../../utils/dateTooklit';

const FormattedTimerValue = ({ timerValue }) => {
  const minSec = getFormattedTimerValue(timerValue);

  return (
    <View style={styles.timeTextContainer}>
      <Text style={styles.timeText}>{minSec}</Text>
    </View>
  );
};

FormattedTimerValue.propTypes = {
  timerValue: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
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

export default FormattedTimerValue;
