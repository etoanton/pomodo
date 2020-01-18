import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import {
  startOfYear,
  differenceInDays,
} from 'date-fns';

import { DOT_SIZE, SCREEN_HORIZONTAL_PADDING, ROW_ELEMENT_COUNT } from './config';
import { calculateFrameSizes, calculateFramePositions } from './helpers';

const now = new Date();
const startOfCurrentYear = startOfYear(now);
const currentDayIndex = differenceInDays(now, startOfCurrentYear) + 1;
const currentRowIndex = Math.trunc(currentDayIndex / ROW_ELEMENT_COUNT);
const currentDayInRowIndex = (currentDayIndex - currentRowIndex * ROW_ELEMENT_COUNT) - 1;

const { offsetBetweenDots, startFrom, singleFrameWidth, spaceBetweenFrames } = calculateFrameSizes();

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

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    marginBottom: 2,
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

export default HistoryRow;
