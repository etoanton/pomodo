import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import { format, formatDistanceStrict } from 'date-fns';

const PomodoItem = ({ item }) => {
  const {
    startedAt,
    finishedAt,
    tagName,
    createdAt,
  } = item;

  const startedAtDate = new Date(startedAt);
  const finishedAtDate = new Date(finishedAt);
  const timeSpent = formatDistanceStrict(startedAtDate, finishedAtDate);

  const date = new Date(createdAt);
  const dateFormatted = format(date, 'do MMM');
  const timeFormatted = format(date, 'HH:mm');

  return (
    <View style={styles.itemContainer}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateValue}>{dateFormatted}</Text>
        <Text style={styles.dateValue}>{timeFormatted}</Text>
      </View>
      <View style={styles.timeSpentContainer}>
        <Text style={styles.timeSpentValue}>
          {`${timeSpent} on`}
        </Text>
        <View style={styles.tagContainer}>
          <Text style={styles.tagValue}>{`#${tagName}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27272E',
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,

    // shadowColor: '#000000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.4,
    // shadowRadius: 2.5,
  },
  dateContainer: {
    paddingRight: 20,
    height: 40,
    justifyContent: 'space-around',
  },
  dateValue: {
    color: '#d1d1d1',
  },
  timeSpentContainer: {
    height: 40,
    justifyContent: 'space-around',
  },
  timeSpentValue: {
    color: '#fff',
  },
  tagContainer: {},
  tagValue: {
    color: '#737373',
  },
});

PomodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    tagId: PropTypes.string.isRequired,
    tagName: PropTypes.string.isRequired,
    taskNotes: PropTypes.string,
    userId: PropTypes.string.isRequired,
    startedAt: PropTypes.string.isRequired,
    finishedAt: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default PomodoItem;
