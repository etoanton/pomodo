import React from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import { Pomodos, useDataFetching } from '../api';
import { getFormattedDateBasedOnDayOfYear } from '../dateTooklit';

const DayPreview = ({ selectedDay, setSelectedDay, navigation }) => {
  const rawSelectedDate = getFormattedDateBasedOnDayOfYear(selectedDay, 'yyyy-MM-dd');
  const formattedSelectedDate = getFormattedDateBasedOnDayOfYear(selectedDay, 'do MMM');

  const { loading, results } = useDataFetching(Pomodos.getPomodo, rawSelectedDate);
  const completedCount = results && results.data ? results.data.length : 0;

  const navigateToDayOverview = () => {
    navigation.navigate('DayOverview', { selectedDay: rawSelectedDate });
  };

  return (
    <View style={styles.contentContainer}>
      <TouchableOpacity style={styles.viewAllContainer} onPress={navigateToDayOverview}>
        <Ionicons
          style={styles.btnIcon}
          name="ios-menu"
          size={21}
          color="#F1F1F1"
        />
      </TouchableOpacity>
      <View style={styles.countContainer}>
        <Text style={styles.textCount}>
          {`${completedCount} pomodo(s)`}
        </Text>
        <Text style={styles.textDate}>{`at ${formattedSelectedDate}`}</Text>
        { loading && (
          <View style={styles.loadingDate}>
            <ActivityIndicator size="small" color="#F1F1F1" />
          </View>
        ) }
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

DayPreview.propTypes = {
  selectedDay: PropTypes.number.isRequired,
  setSelectedDay: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 3,
    width: 300,
    borderRadius: 20,
    backgroundColor: '#2F2F38',
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000000',
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
    paddingLeft: 4,
    color: '#B6B6B6',
    fontWeight: '300',
  },
});

export default withNavigation(DayPreview);
