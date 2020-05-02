import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import { DOT_SIZE, SCREEN_HORIZONTAL_PADDING } from './config';
import { calculateFrameSizes, getCurrentDayIndex } from './helpers';
import Dot from './Dot/index';

const {
  offsetBetweenDots,
} = calculateFrameSizes();

const SingleRow = ({
  row,
  setSelectedDay,
}) => {
  const { currentDayIndex } = getCurrentDayIndex();

  return (
    <View style={styles.rowContainer}>
      {row.data.map(({
        id, dayIndex, monthIndex, completedTasks, type,
      }) => (
        <Dot
          key={id}
          type={type}
          dayIndex={dayIndex}
          monthIndex={monthIndex}
          isToday={(id + 1) === currentDayIndex}
          completedCount={completedTasks ? completedTasks.length : 0}
          onPress={setSelectedDay}
        />
      ))}
    </View>
  );
};

SingleRow.propTypes = {
  row: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        // ...
      }),
    ),
  }).isRequired,
  setSelectedDay: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 7,
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
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
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

export default SingleRow;
