import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Pomodos, useDataFetching } from '../api';
import { getFormattedDateBasedOnDayOfYear } from '../dateTooklit';

const DayPreview = ({ selectedDay, setSelectedDay }) => {
  const rawSelectedDate = getFormattedDateBasedOnDayOfYear(selectedDay, 'yyyy-MM-dd');
  const formattedSelectedDate = getFormattedDateBasedOnDayOfYear(selectedDay, 'do MMM');

  const { loading, results, error } = useDataFetching(Pomodos.getPomodo, { rawSelectedDate });
  const completedCount = results && results.data ? results.data.length : 0;

  return (
    <View style={styles.contentContainer}>
      <TouchableOpacity style={styles.viewAllContainer}>
        <Ionicons
          style={styles.btnIcon}
          name="ios-menu"
          size={21}
          color="#F1F1F1"
        />
      </TouchableOpacity>
      <View style={styles.countContainer}>
        { loading && <ActivityIndicator size="small" color="#F1F1F1" /> }
        { !loading && <Text style={styles.textCount}>{completedCount} pomodo(s)</Text> }
        <Text style={styles.textDate}>at {formattedSelectedDate}</Text>
      </View>
      <TouchableOpacity style={styles.closeContainer} onPress={() => setSelectedDay(null)}>
        <Ionicons
          style={styles.btnIcon}
          name="ios-close"
          size={30}
          color="#F1F1F1"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 3,
    width: 280,
    borderRadius: 20,
    backgroundColor: '#2F2F38',
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2.5,
  },
  viewAllContainer: {
    paddingHorizontal: 18,
    paddingTop: 2,
  },
  countContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  closeContainer: {
    paddingHorizontal: 18,
    paddingTop: 4,
  },
  btnIcon: {},
  textCount: {
    color: '#F1F1F1',
    fontWeight: '500',
  },
  textDate: {
    color: '#F1F1F1',
    paddingLeft: 4,
    color: '#B6B6B6',
    fontWeight: '300',
  },
});

export default DayPreview;