import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import {
  startOfWeek,
  addMonths,
  startOfMonth,
  addYears,
  startOfYear,
  differenceInDays,
} from 'date-fns';

import ProgressBar from './ProgressBar';

const DaysLeftCount = ({ label }) => {
  const now = new Date();

  // TODO: weekStartsOn: 0 or 1 (Sunday or Monday)
  const startOfCurrentWeek = startOfWeek(now, { weekStartsOn: 1 });
  const startOfCurrentMonth = startOfMonth(now);
  const startOfNextMonth = addMonths(startOfCurrentMonth, 1);
  const startOfCurrentYear = startOfYear(now);
  const startOfNextYear = addYears(startOfCurrentYear, 1);

  const totalMapCount = {
    week: 7,
    month: differenceInDays(startOfNextMonth, startOfCurrentMonth),
    year: differenceInDays(startOfNextYear, startOfCurrentYear),
  };

  const completedMapCount = {
    week: differenceInDays(now, startOfCurrentWeek),
    month: differenceInDays(now, startOfCurrentMonth),
    year: differenceInDays(now, startOfCurrentYear),
  };

  const totalCount = totalMapCount[label];
  const completedCount = completedMapCount[label];
  const leftCount = totalCount - completedCount;
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.count}>{leftCount}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.text}>day(s) of</Text>
          <Text style={styles.text}>
            {`${label} left`}
          </Text>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <ProgressBar completed={completedCount / totalCount} />
      </View>
    </View>
  );
};

DaysLeftCount.week = 'week';
DaysLeftCount.month = 'month';
DaysLeftCount.year = 'year';

DaysLeftCount.propTypes = {
  label: PropTypes.oneOf(['week', 'month', 'year']).isRequired,
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
