import React from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const DOT_SIZE = 24;
const FRAME_OVERFLOW = 6;
const SCREEN_HORIZONTAL_PADDING = 24;
const ROW_ELEMENT_COUNT = 10;

const contentWidth = screenWidth - SCREEN_HORIZONTAL_PADDING * 2;
const offsetBetweenDots = (contentWidth - DOT_SIZE * ROW_ELEMENT_COUNT) / (ROW_ELEMENT_COUNT - 1);
const startFrom = SCREEN_HORIZONTAL_PADDING - FRAME_OVERFLOW;
const singleFrameWidth = DOT_SIZE + FRAME_OVERFLOW * 2;
const spaceBetweenFrames = offsetBetweenDots - FRAME_OVERFLOW * 2 + FRAME_OVERFLOW / (ROW_ELEMENT_COUNT - 1);

// mock data
const ROWS_COUNT = 36;
const DATA = Array(ROWS_COUNT).fill(0).map((_, rowIdx) => {
  const elemCount = rowIdx < (ROWS_COUNT - 1) ? ROW_ELEMENT_COUNT : 4;
  const row = Array(elemCount).fill(0).map((_, idx) => ({
    id: idx,
    hasCompletedTasks: Math.random() < 0.5,
    completedCount: Math.trunc(Math.random() * 10),
  }));
  return ({ id: rowIdx, data: row });
});


const HistoryRow = ({ row, rowIndex }) => {
  let underLayerMap = [];
  if (row?.data?.some(({ hasCompletedTasks }) => hasCompletedTasks)) {
    underLayerMap = row.data.reduce((acc, item, idx) => {
      if (item.hasCompletedTasks) {
        if (!acc.length || acc[acc.length - 1].to !== (idx - 1)) {
          acc.push({ from: idx, to: idx });
        } else {
          acc[acc.length - 1].to = idx;
        }
      }
      return acc;
    }, []);
  }
  return (
    <View style={styles.rowContainer}>
      {row.data.map(({ id }) => (
        <TouchableOpacity
          key={`${id}_item`}
          style={styles.item}
          omPress={() => {}}
        />
      ))}
      { underLayerMap.map(({ from, to }) => {
        const left = startFrom + from * DOT_SIZE + from * offsetBetweenDots;
        const width = (to - from + 1) * singleFrameWidth + (to - from) * spaceBetweenFrames;
        return (
          <View
            key={`${from}_${to}`}
            style={{
              ...styles.underLayer,
              left,
              width,
            }}
          />
        )
      }) }
      {/* <View style={styles.rowLabelContainer}>
        <Text style={styles.rowLabel}>{(rowIndex + 1) * ROW_ELEMENT_COUNT}</Text>
      </View> */}
    </View>
  );
};

const HistoryRows = () => (
  <FlatList
    data={DATA}
    renderItem={({ item, index }) => <HistoryRow row={item} rowIndex={index} />}
    keyExtractor={row => row.id}
  />
);

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
  },
  item: {
    backgroundColor: '#27272E',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    marginRight: offsetBetweenDots,
  },
  underLayer: {
    position: 'absolute',
    top: 3,
    bottom: 3,
    opacity: 0.05,
    backgroundColor: '#FFFFFF',
    borderRadius: DOT_SIZE,
    zIndex: -1,
  },
  rowLabelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 19,
    justifyContent: 'center',
  },
  rowLabel: {
    color: '#6B6B6B',
    fontSize: 6,
    textAlign: 'center'
  },
});

export default HistoryRows;
