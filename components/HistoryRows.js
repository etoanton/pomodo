import React, { useState } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, Dimensions } from 'react-native';

import {
  startOfYear,
  differenceInDays,
} from 'date-fns';

import Tabs from './Tabs';
import { daysData, weeksData, monthesData } from './mocks';

const { width: screenWidth } = Dimensions.get('window');

const DOT_SIZE = 24;
const FRAME_OVERFLOW = 6;
const SCREEN_HORIZONTAL_PADDING = 24;
const ROW_ELEMENT_COUNT = 10;

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
  const [activeTabId, setActiveTabId] = useState('d');

  const data = activeTabId === 'd' ? daysData :
    activeTabId === 'w' ? weeksData :
      activeTabId === 'm' ? monthesData : daysData;

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <Tabs
          activeTabId={activeTabId}
          handlePress={id => setActiveTabId(id)}
          tabsConfig={[{ id: 'd', name: 'Days' }, { id: 'w', name: 'Weeks' }, { id: 'm', name: 'Monthes' }, { id: 'y', name: 'Years' }]}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
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
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  listContainer: {
    flex: 1,
    paddingTop: 10,
  },
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
