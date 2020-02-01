import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

import { Tasks, useDataFetching } from '../../api';
import Tabs from '../Tabs';
import DayPreview from '../DayPreview';
import SingleRow from './SingleRow';
import { daysData, weeksData, monthesData } from './mocks';
import { mergeLists } from './helpers';

const TABS = {
  DAY: 'd',
  WEEK: 'w',
  MONTH: 'm',
  YEAR: 'y',
}

const HistoryRows = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeTabId, setActiveTabId] = useState(TABS.DAY);
  const [data, setData] = useState([]);

  const { loading, results, error } = useDataFetching(Tasks.getCompletedTasks);

  // Merge "empty" days data & user data
  useEffect(() => {
    const rawData = activeTabId === TABS.DAY ? daysData :
      activeTabId === TABS.WEEK ? weeksData :
        activeTabId === TABS.MONTH ? monthesData : daysData;

    const mergedData = results && results.data ? mergeLists(rawData, results.data) : rawData;

    setData(mergedData);
  }, [results]);

  // TODO: https://facebook.github.io/react-native/docs/refreshcontrol

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
            { id: TABS.YEAR, name: 'Years' },
          ]}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={({ item = [], index }) => (
            <SingleRow 
              row={item}
              rowIndex={index}
              isScrolling={isScrolling}
              setSelectedDay={setSelectedDay}
            />
          )}
          keyExtractor={row => `${row.id}`}
          onScrollBeginDrag={() => setIsScrolling(true)}
          onScrollEndDrag={() => setIsScrolling(false)}
        />
      </View>
      <View style={styles.dayPreviewContainer}>
        { selectedDay !== null && <DayPreview selectedDay={selectedDay} setSelectedDay={setSelectedDay} /> }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    paddingTop: 23,
    paddingHorizontal: 10,
  },
  listContainer: {
    flex: 1,
    paddingTop: 16,
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

export default HistoryRows;
