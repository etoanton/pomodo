import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const MAX_ITEMS = 8;

const ProgressDots = ({ itemsCount, activeItemIdx }) => {
  const visibleItemsCount = itemsCount <= MAX_ITEMS ? itemsCount : MAX_ITEMS;
  let localActiveItemIdx = activeItemIdx;

  if (itemsCount > MAX_ITEMS) {
    if (activeItemIdx === itemsCount - 1) {
      localActiveItemIdx = MAX_ITEMS - 1;
    } else {
      localActiveItemIdx = Math.min(activeItemIdx, MAX_ITEMS - 2);
    }
  }

  return (
    <View style={styles.container}>
      {Array(visibleItemsCount).fill(0).map((_, idx) => (
        <View
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          style={{
            ...styles.dotItem,
            ...(localActiveItemIdx === idx ? styles.activeDotItem : {}),
            ...(localActiveItemIdx > idx ? styles.completedDotItem : {}),
          }}
        />
      ))}
    </View>
  );
};


ProgressDots.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  activeItemIdx: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  dotItem: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 3,
  },
  activeDotItem: {
    backgroundColor: '#fff',
  },
  completedDotItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default ProgressDots;
