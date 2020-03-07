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
import Tabs from '../Tabs';

import SingleRow from './SingleRow';
import { mergeLists, separateToRows, getCurrentDayIndex } from './helpers';

const TABS = {
  DAY: 'd',
  WEEK: 'w',
  MONTH: 'm',
};

const daysData = separateToRows(daysList);
const weeksData = separateToRows(daysList);
const monthesData = separateToRows(daysList);

const HistoryDots = ({ user }) => {
  let listRef = null;
  const [selectedDay, setSelectedDay] = useState(null);
  const [activeTabId, setActiveTabId] = useState(TABS.DAY);
  const [data, setData] = useState([]);

  const { loading, results, refetch: refetchPomodos } = useDataFetching(Pomodos.getPomodos);

  const scrollToday = () => {
    const { currentDayRowIndex } = getCurrentDayIndex();
    listRef.scrollToIndex({
      index: currentDayRowIndex,
      animated: true,
      viewPosition: 0.5,
    });
  };

  useEffect(() => {
    refetchPomodos();
  }, [user]);

  /* Merge "empty" list of days data & user data */
  useEffect(() => {
    const rawData = activeTabId === TABS.DAY ? daysData
      : activeTabId === TABS.WEEK ? weeksData
        : activeTabId === TABS.MONTH ? monthesData : daysData;

    const mergedData = results && results.data ? mergeLists(rawData, results.data) : rawData;

    setData(mergedData);
  }, [results]);

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <Tabs
          activeTabId={activeTabId}
          handlePress={id => setActiveTabId(id)}
          tabsConfig={[
            { id: TABS.DAY, name: 'Days' },
            { id: TABS.WEEK, name: 'Weeks' },
            { id: TABS.MONTH, name: 'Monthes' },
          ]}
          scrollToday={scrollToday}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          ref={ref => { listRef = ref; }}
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
