import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

import useDataFetching from '../hocs/withDataFetching';
import { ENV } from '../../config';
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

  const { loading, results, error } = useDataFetching(`${ENV.apiUrl}/v1/completedTasks`);

  useEffect(() => {
    const rawData = activeTabId === 'd' ? daysData :
      activeTabId === 'w' ? weeksData :
        activeTabId === 'm' ? monthesData : daysData;

    let mergedData = rawData;

    const { data: dateMap = {} } = results;
    if (Object.keys(data).length) {
      mergedData = mergeLists(rawData, dateMap);
    }

    setData(mergedData);
  }, [results, activeTabId]);

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <Tabs
          activeTabId={activeTabId}
          handlePress={id => setActiveTabId(id)}
          tabsConfig={[{ id: TABS.DAY, name: 'Days' }, { id: 'w', name: 'Weeks' }, { id: 'm', name: 'Monthes' }, { id: 'y', name: 'Years' }]}
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
