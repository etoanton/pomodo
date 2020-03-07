import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

const TimeBoundaries = ({ from, to }) => (
  <View style={styles.container}>
    <View style={styles.partContainer}>
      <View style={styles.partContent}>
        <Text style={styles.label}>from</Text>
        <Text style={styles.value}>{from}</Text>
      </View>
    </View>
    <View style={styles.separator} />
    <View style={styles.partContainer}>
      <View style={styles.partContent}>
        <Text style={styles.label}>to</Text>
        <Text style={styles.value}>{to}</Text>
      </View>
    </View>
  </View>
);

TimeBoundaries.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#31323C',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  partContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  separator: {
    width: 1,
    backgroundColor: '#585858',
  },
  label: {
    textAlign: 'center',
    color: '#C1C1C1',
    fontSize: 12,
  },
  value: {
    textAlign: 'center',
    color: '#E5E5E5',
    fontSize: 32,
  },
});

export default TimeBoundaries;
