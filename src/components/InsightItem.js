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
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';

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
  const setNextDate = () => setDate(addMonths(currentDate, 1));
  const setPreviousDate = () => setDate(addMonths(currentDate, -1));

  const data = list.map(item => item[keyExtract]);
  console.log('data', data);

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
              name="md-arrow-dropleft"
              size={24}
              color="#F1F1F1"
            />
          </TouchableOpacity>
          <Text style={styles.currentMonthText}>{format(currentDate, 'MMM yyyy')}</Text>
          <TouchableOpacity style={styles.monthPickerBtn} onPress={setNextDate}>
            <Ionicons
              name="md-arrow-dropright"
              size={24}
              color="#F1F1F1"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.chartContent}>
          <YAxis
            data={data}
            contentInset={{ top: 10, bottom: 10 }}
            formatLabel={(value, idx) => ((idx + 1) % 3 === 0 ? value : '')}
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <BarChart
              style={{ height: 160 }}
              data={data}
              svg={{ fill: '#ccc' }}
            >
              <Grid />
            </BarChart>
            <XAxis
              style={{ marginTop: 10 }}
              data={data}
              formatLabel={(_, idx) => (idx % 3 === 0 ? idx + 1 : '')}
              contentInset={{ left: 5, right: 5 }}
              svg={{ fontSize: 10, fill: '#878787' }}
            />
          </View>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 10,
  },
  container: {},
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
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
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  monthPickerContainer: {
    paddingVertical: 15,
    paddingHorizontal: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentMonthText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonForward: {
    transform: [
      { rotate: '-90deg' },
    ],
  },
  chartContent: {
    flex: 1,
    flexDirection: 'row',
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
