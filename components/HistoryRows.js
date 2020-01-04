import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

const ROWS_COUNT = 100;
const ROW_ELEMENT_COUNT = 10;
const SIZE = 24;

const DATA = Array(ROWS_COUNT).fill(0).map((_, idx) => idx);

const HistoryRow = () => (
  <View style={styles.rowContainer}>
    {Array(ROW_ELEMENT_COUNT).fill(0).map(idx => (
      <View key={`${idx}_item`} style={styles.item} />
    ))}
  </View>
);

const HistoryRows = () => (
  <FlatList
    data={DATA}
    renderItem={HistoryRow}
    keyExtractor={idx => `${idx}_row`}
  />
);

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  item: {
    backgroundColor: '#27272E',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },
});

export default HistoryRows;
