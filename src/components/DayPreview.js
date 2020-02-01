import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { generateDateBasedOnNumber } from '../dateTooklit';

const DayPreview = ({ selectedDay, setSelectedDay }) => {
  const selectedDate = generateDateBasedOnNumber(selectedDay);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.viewAllContainer}>
        <Ionicons
          style={styles.btnIcon}
          name="ios-menu"
          size={21}
          color="#F1F1F1"
        />
      </TouchableOpacity>
      <View style={styles.countContainer}>
        <Text style={styles.textCount}>12 pomodos</Text>
        <Text style={styles.textDate}>at {selectedDate}</Text>
      </View>
      <TouchableOpacity style={styles.closeContainer} onPress={() => setSelectedDay(null)}>
        <Ionicons
          style={styles.btnIcon}
          name="ios-close"
          size={27}
          color="#F1F1F1"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
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
    paddingHorizontal: 15,
  },
  countContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  closeContainer: {
    paddingHorizontal: 15,
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