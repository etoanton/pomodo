import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GROUP_BY_OPTIONS = [
  { id: 'day', name: 'Days' },
  { id: 'week', name: 'Weeks' },
  { id: 'month', name: 'Monthes' },
];

const Header = ({ scrollToday }) => {
  const [groupByIndex, setGroupBy] = useState(0);

  const toggleGroupBy = () => {
    setGroupBy(groupByIndex + 1 < GROUP_BY_OPTIONS.length ? groupByIndex + 1 : 0);
  };

  const groupBy = GROUP_BY_OPTIONS[groupByIndex];

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeftAreaContainer}>
        <TouchableOpacity
          style={styles.toggleContainer}
          onPress={toggleGroupBy}
        >
          <Text style={styles.toggleControlText}>{groupBy.name}</Text>
          <Ionicons
            name="md-list"
            size={12}
            color="#F1F1F1"
          />
        </TouchableOpacity>

        <View style={styles.extraInfoContainer}>
          <Text style={styles.extraInfoLabel}>Completed count:</Text>
          <View style={styles.extraInfoValueContainer}>
            <Text style={styles.extraInfoValue}>45</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.todayBtn} onPress={scrollToday}>
        <Text style={styles.todayBtnText}>Today</Text>
      </TouchableOpacity>
    </View>
  );
};

Header.propTypes = {
  scrollToday: PropTypes.func.isRequired,
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
    width: 75,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'baseline',
    marginRight: 15,
  },
  toggleControlText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#D1D1D1',
    paddingRight: 7,
  },
  todayBtn: {
    width: 50,
    alignItems: 'center',
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
  extraInfoLabel: {
    color: '#b5b5b5',
    fontWeight: '500',
    fontSize: 14,
  },
  extraInfoValueContainer: {
    paddingLeft: 5,
  },
  extraInfoValue: {
    color: '#dbdbdb',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default Header;
