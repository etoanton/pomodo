import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import { format } from 'date-fns';
import { getFormattedDistance } from '../utils/dateTooklit';

const PomodoItem = ({ item }) => {
  const {
    startedAt,
    finishedAt,
    sessionNotes,
    sessionDurations,
  } = item;

  const totalDuration = sessionDurations.reduce((sum, d) => sum + d, 0);
  const timeSpent = getFormattedDistance(totalDuration);

  const startedAtTime = format(new Date(startedAt), 'HH:mm');
  const finishedAtTime = format(new Date(finishedAt), 'HH:mm');

  return (
    <View style={styles.itemContainer}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateValue}>{startedAtTime}</Text>
        <Text style={styles.dateValue}>{finishedAtTime}</Text>
      </View>
      <View style={styles.timeSpentContainer}>
        <Text style={styles.timeSpentValue}>
          {`Productive time: ${timeSpent}`}
        </Text>
        <View style={styles.tagContainer}>
          <Text style={styles.tagValue} numberOfLines={1} ellipsizeMode="tail">
            {sessionNotes}
          </Text>
        </View>
      </View>
    </View>
  );
};

PomodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    tagId: PropTypes.string,
    sessionNotes: PropTypes.string,
    userId: PropTypes.string.isRequired,
    startedAt: PropTypes.string.isRequired,
    finishedAt: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    sessionDurations: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
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

export default PomodoItem;
