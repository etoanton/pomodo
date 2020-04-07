import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const GROUP_BY = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
};

const GROUP_BY_OPTIONS = [
  { id: GROUP_BY.DAY, name: 'Today' },
  { id: GROUP_BY.WEEK, name: 'This Week' },
  { id: GROUP_BY.MONTH, name: 'This Month' },
];

const Header = ({ scrollToday, overallStats }) => {
  const [groupByIndex, setGroupBy] = useState(0);

  const toggleGroupBy = () => {
    setGroupBy(groupByIndex + 1 < GROUP_BY_OPTIONS.length ? groupByIndex + 1 : 0);
  };

  const groupBy = GROUP_BY_OPTIONS[groupByIndex];

  const { count, duration } = overallStats[groupBy.id];

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.toggleContainer}
        onPress={toggleGroupBy}
      >
        <Ionicons
          name="md-list"
          size={12}
          color="#F1F1F1"
        />
        <Text style={styles.toggleControlText}>{groupBy.name}</Text>
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={scrollToday}>
        <View style={styles.extraInfoContainer}>
          <Text style={styles.extraInfoValue}>{`${count} sessions`}</Text>
          <Text style={styles.extraInfoSeparator}>|</Text>
          <Text style={styles.extraInfoValue}>{`${duration} min`}</Text>
        </View>
      </TouchableWithoutFeedback>

      {/* <TouchableOpacity style={styles.todayBtn} onPress={scrollToday}>
        <Text style={styles.todayBtnText}>Today</Text>
      </TouchableOpacity> */}
    </View>
  );
};

Header.defaultProps = {
  overallStats: {
    [GROUP_BY.DAY]: {
      duration: 0,
      count: 0,
    },
    [GROUP_BY.WEEK]: {
      duration: 0,
      count: 0,
    },
    [GROUP_BY.MONTH]: {
      duration: 0,
      count: 0,
    },
  },
};

Header.propTypes = {
  scrollToday: PropTypes.func.isRequired,
  overallStats: PropTypes.shape({
    [GROUP_BY.DAY]: {
      duration: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    },
    [GROUP_BY.WEEK]: {
      duration: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    },
    [GROUP_BY.MONTH]: {
      duration: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    },
  }),
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeftAreaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleContainer: {
    width: 95,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  toggleControlText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#D1D1D1',
    paddingLeft: 7,
  },
  todayBtn: {
    width: 95,
    alignItems: 'flex-end',
    borderRadius: 7,
    paddingVertical: 5,
  },
  todayBtnText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#67B78F',
  },

  extraInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderRadius: 10,
  },
  extraInfoValue: {
    color: '#dbdbdb',
    fontWeight: '600',
    fontSize: 14,
  },
  extraInfoSeparator: {
    color: '#b5b5b5',
    paddingHorizontal: 3,
  },
});

export default Header;
