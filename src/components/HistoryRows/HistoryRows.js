import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

import { Tasks, useDataFetching } from '../../api';
import Tabs from '../Tabs';
import HistoryRow from './SingleRow';
import { daysData, weeksData, monthesData } from './mocks';
import { mergeLists } from './helpers';

const TABS = {
  DAY: 'd',
  WEEK: 'w',
  MONTH: 'm',
  YEAR: 'y',
}

const HistoryRows = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeTabId, setActiveTabId] = useState('d');
  const [data, setData] = useState([]);

  const { loading, results, error } = useDataFetching(Tasks.getCompletedTasks);

  useEffect(() => {
    const rawData = activeTabId === TABS.DAY ? daysData :
      activeTabId === TABS.WEEK ? weeksData :
        activeTabId === TABS.MONTH ? monthesData : daysData;

    let mergedData = rawData;

    const { data: dateMap = {} } = results;
    if (Object.keys(data).length) {
      mergedData = mergeLists(rawData, dateMap);
    }

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
            { id: TABS.YEAR, name: 'Years' },
          ]}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={({ item = [], index }) => (
            <HistoryRow 
              row={item}
              rowIndex={index}
              isScrolling={isScrolling}
            />
          )}
          keyExtractor={row => `${row.id}`}
          onScrollBeginDrag={() => setIsScrolling(true)}
          onScrollEndDrag={() => setIsScrolling(false)}
        />
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
});

export default HistoryRows;
