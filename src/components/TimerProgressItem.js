import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

const TimerProgressItem = ({ label, time }) => (
  <View style={styles.container}>
    <Text style={styles.itemLabel}>{label}</Text>
    <Text style={styles.itemTime}>{time}</Text>
  </View>
);

TimerProgressItem.propTypes = {
  label: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: '#2F2F38',
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2.5,
  },
  itemLabel: {
    fontSize: 17,
    color: '#fff',
  },
  itemTime: {
    fontSize: 17,
    color: '#fff',
  },
});

export default TimerProgressItem;
