import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format, addMonths } from 'date-fns';

import { BarChart, Grid } from 'react-native-svg-charts';
import { UNDERLAY_COLOR } from '../styles/colors';

const InsightItem = ({
  title,
  loading,
  list,
  currentDate,
  setDate,
  keyExtract,
  extraInfo,
}) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  const setNextDate = () => setDate(addMonths(currentDate, 1));
  const setPreviousDate = () => setDate(addMonths(currentDate, -1));

  const data = list.map(item => item[keyExtract]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.extraInfoContainer}>
          <Text style={styles.extraInfoLabel}>{extraInfo.label}</Text>
          <View style={styles.extraInfoValueContainer}>
            <Text style={styles.extraInfoValue}>{extraInfo.value}</Text>
          </View>
        </View>
      </View>
      <View style={styles.chartContainer}>
        <View style={styles.monthPickerContainer}>
          <TouchableOpacity style={styles.monthPickerBtn} onPress={setPreviousDate}>
            <Ionicons
              name="ios-arrow-dropleft"
              size={24}
              color="#F1F1F1"
            />
          </TouchableOpacity>
          <Text style={styles.currentMonthText}>{format(currentDate, 'MMM yyyy')}</Text>
          <TouchableOpacity style={styles.monthPickerBtn} onPress={setNextDate}>
            <Ionicons
              name="ios-arrow-dropright"
              size={24}
              color="#F1F1F1"
            />
          </TouchableOpacity>
        </View>
        <BarChart
          style={{ height: 200 }}
          data={data}
          svg={{ fill: '#ccc' }}
          contentInset={{ top: 30, bottom: 30 }}
        >
          <Grid />
        </BarChart>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {},
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {},
  titleText: {
    color: '#fff',
    fontSize: 21,
    fontWeight: '500',
  },
  chartContainer: {
    marginVertical: 7,
    borderRadius: 10,
    backgroundColor: '#2b2b33',
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  monthPickerContainer: {
    paddingTop: 14,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentMonthText: {
    color: '#fff',
    fontSize: 18,
  },
  extraInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    backgroundColor: UNDERLAY_COLOR,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  extraInfoLabel: {
    color: '#b5b5b5',
    fontWeight: '500',
    fontSize: 14,
  },
  extraInfoValueContainer: {
    paddingLeft: 5,
  },
  extraInfoValue: {
    color: '#dbdbdb',
    fontWeight: '600',
    fontSize: 14,
  },
});

InsightItem.defaultProps = {
  extraInfo: {},
  list: [],
};

InsightItem.propTypes = {
  title: PropTypes.string.isRequired,
  extraInfo: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  currentDate: PropTypes.instanceOf(Date).isRequired,
  keyExtract: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    timeSpent: PropTypes.number,
    completedCount: PropTypes.number,
  })),
  setDate: PropTypes.func.isRequired,
};

export default InsightItem;
