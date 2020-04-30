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

import Header from './Header';
import SingleRow from './SingleRow';
import { mergeLists, separateToRows, getCurrentDayIndex } from './helpers';

const daysRawData = separateToRows(daysList);

const HistoryDots = ({ user }) => {
  let listRef = null;
  const [selectedDay, setSelectedDay] = useState(null);
  const [data, setData] = useState([]);

  const { loading, results, refetch: refetchPomodos } = useDataFetching(Pomodos.getPomodos);
  const { results: statsResults, refetch: refetchStats } = useDataFetching(Pomodos.getStats);

  const refetchData = () => {
    refetchPomodos();
    refetchStats();
  };

  const scrollToday = () => {
    const { currentDayRowIndex } = getCurrentDayIndex();
    listRef.scrollToIndex({
      index: currentDayRowIndex,
      animated: true,
      viewPosition: 0.5,
    });
  };

  useEffect(() => {
    refetchData();
  }, [user]);

  useEffect(() => {
    const mergedData = results && results.data
      ? mergeLists(daysRawData, results.data) : daysRawData;

    setData(mergedData);
  }, [results]);

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <Header scrollToday={scrollToday} overallStats={statsResults.data} />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          ref={ref => { listRef = ref; }}
          data={data}
          renderItem={({ id, item = [] }) => (
            <SingleRow
              key={id}
              row={item}
              setSelectedDay={setSelectedDay}
            />
          )}
          keyExtractor={row => `${row.id}`}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={refetchData} />}
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
    paddingTop: 12,
    paddingBottom: 5,
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
