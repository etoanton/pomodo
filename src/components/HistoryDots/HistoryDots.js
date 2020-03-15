/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  FlatList,
  View,
  RefreshControl,
} from 'react-native';

import { Pomodos, useDataFetching } from '../../api';
import daysList from '../../../helpers/2020/days.json';
import TodayPomodos from '../TodayPomodos';

import SingleRow from './SingleRow';
import { mergeLists, separateToRows } from './helpers';

const daysData = separateToRows(daysList);

const HistoryDots = ({ user }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [data, setData] = useState([]);

  const { loading, results, refetch: refetchPomodos } = useDataFetching(Pomodos.getPomodos);

  useEffect(() => {
    refetchPomodos();
  }, [user]);

  /* Merge "empty" list of days data & user data */
  useEffect(() => {
    const mergedData = results && results.data ? mergeLists(daysData, results.data) : daysData;

    setData(mergedData);
  }, [results, daysData]);

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={({ item = [] }) => (
            <SingleRow
              row={item}
              setSelectedDay={setSelectedDay}
            />
          )}
          keyExtractor={row => `${row.id}`}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={refetchPomodos} />}
        />
      </View>
      <View style={styles.dayPreviewContainer}>
        { selectedDay !== null && (
          <TodayPomodos selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        ) }
      </View>
    </View>
  );
};

HistoryDots.defaultProps = {
  user: null,
};

HistoryDots.propTypes = {
  user: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  listContainer: {
    flex: 1,
  },
  dayPreviewContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    flex: 1,
    zIndex: 1,
  },
});

export default HistoryDots;
