import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import { format } from 'date-fns';


const PomodoItem = ({ item }) => {
  const date = new Date(item.createdAt);
  const dateFormatted = format(date, 'do MMM HH:mm');

  // const { taskNotes, timeSpent, tagId } = item;

  return (
    <View style={styles.itemContainer}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateValue}>{dateFormatted}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#27272E',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2.5,
  },
  dateContainer: {},
  dateValue: {
    color: '#fff',
  },
});

PomodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    tagId: PropTypes.string.isRequired,
    taskNotes: PropTypes.string,
    timeSpent: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default PomodoItem;
