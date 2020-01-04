import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import ProgressBar from './ProgressBar';

// TODO: use dynamic values for month/year
const totalMap = {
  week: 7,
  month: 31,
  year: 365,
};

const DaysLeftCount = ({ leftCount, label = 'week' }) => {
  const totalCount = totalMap[label];
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.count}>{leftCount}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.text}>day(s) of</Text>
          <Text style={styles.text}>{label} left</Text>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <ProgressBar completed={(totalCount - leftCount) / totalCount} />
      </View>
    </View>
  );
}  

DaysLeftCount.week = 'week';
DaysLeftCount.month = 'month';
DaysLeftCount.year = 'year';

DaysLeftCount.propTypes = {
  count: PropTypes.number,
  label: PropTypes.oneOf(['week', 'month', 'year']),
};

const styles = StyleSheet.create({
  container: {},
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  count: {
    fontSize: 30,
    fontWeight: '500',
    color: '#E5E5E5',
  },
  textContainer: {
    paddingLeft: 5,
  },
  text: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 12,
    color: '#B6B6B6',
  },
  progressContainer: {
    flex: 1,
    paddingTop: 7,
  },
});

export default DaysLeftCount;