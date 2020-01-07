import React, { useState } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, Dimensions } from 'react-native';

import {
  startOfYear,
  differenceInDays,
} from 'date-fns';

const { width: screenWidth } = Dimensions.get('window');

const DOT_SIZE = 24;
const FRAME_OVERFLOW = 6;
const SCREEN_HORIZONTAL_PADDING = 24;
const ROW_ELEMENT_COUNT = 10;
const TOOLTIP_SIZE = 30;

const now = new Date();
const startOfCurrentYear = startOfYear(now);
const currentDayIndex = differenceInDays(now, startOfCurrentYear) + 1;
const currentRowIndex = Math.trunc(currentDayIndex / ROW_ELEMENT_COUNT);
const currentDayInRowIndex = (currentDayIndex - currentRowIndex * ROW_ELEMENT_COUNT) - 1;

const contentWidth = screenWidth - SCREEN_HORIZONTAL_PADDING * 2;
const offsetBetweenDots = (contentWidth - DOT_SIZE * ROW_ELEMENT_COUNT) / (ROW_ELEMENT_COUNT - 1);
const startFrom = SCREEN_HORIZONTAL_PADDING - FRAME_OVERFLOW;
const singleFrameWidth = DOT_SIZE + FRAME_OVERFLOW * 2;
const spaceBetweenFrames = offsetBetweenDots - FRAME_OVERFLOW * 2 + FRAME_OVERFLOW / (ROW_ELEMENT_COUNT - 1);

// mock data
const ROWS_COUNT = 36;
const DATA = Array(ROWS_COUNT).fill(0).map((_, rowIdx) => {
  const elemCount = rowIdx < (ROWS_COUNT - 1) ? ROW_ELEMENT_COUNT : 4;
  const rowData = Array(elemCount).fill(0).map((_, idx) => ({
    id: idx,
    hasCompletedTasks: Math.random() < 0.5,
    completedCount: Math.trunc(Math.random() * 10),
  }));
  return ({ id: rowIdx, data: rowData });
});

const calculateFramePositions = data => {
  let frames = [];
  if (data?.some(({ hasCompletedTasks }) => hasCompletedTasks)) {
    frames = data.reduce((acc, item, idx) => {
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
  return frames;
}

const HistoryRow = ({ row, rowIndex, isScrolling }) => {
  const frames = calculateFramePositions(row.data);

  const isCurrentRow = rowIndex === currentRowIndex;

  return (
    <View style={styles.rowContainer}>
      {row.data.map(({ id }, idx) => (
        <TouchableOpacity
          key={`${id}_item`}
          style={{
            ...styles.item,
            backgroundColor: isCurrentRow && idx === currentDayInRowIndex ? '#598F5F' : '#27272E',
          }}
          onPress={() => {}}
        />
      ))}
      { frames.map(({ from, to }) => {
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
      { isScrolling && <View style={styles.rowLabelContainer}>
        <Text style={styles.rowLabel}>{rowIndex * ROW_ELEMENT_COUNT + 1}</Text>
      </View> }
    </View>
  );
};

const HistoryRows = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  return (
    <FlatList
      data={DATA}
      renderItem={({ item, index }) => (
        <HistoryRow row={item} rowIndex={index} isScrolling={isScrolling} />
      )}
      keyExtractor={row => `${row.id}`}
      onScrollBeginDrag={() => setIsScrolling(true)}
      onScrollEndDrag={() => setIsScrolling(false)}
    />
  );
}

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
    top: 2,
    bottom: 0,
    left: SCREEN_HORIZONTAL_PADDING,
    width: DOT_SIZE,
    justifyContent: 'center',
    opacity: 0.5,
  },
  rowLabel: {
    color: '#83838C',
    fontSize: 8,
    textAlign: 'center',
  },
});

export default HistoryRows;
