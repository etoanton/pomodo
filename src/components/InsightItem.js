import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const InsightItem = ({
  title,
  list,
  footerLabel,
  footerValue,
}) => {
  console.log(title, list);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View style={styles.chartContainer} />
      <View style={styles.footerContainer}>
        <Text style={styles.footerLabel}>{footerLabel}</Text>
        <View style={styles.footerValueContainer}>
          <Text style={styles.footerValue}>{footerValue}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  headerContainer: {},
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  chartContainer: {
    height: 200,
    marginVertical: 7,
    borderRadius: 10,
    backgroundColor: '#3d3d4a',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    backgroundColor: '#3d3d4a',
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  footerLabel: {
    color: '#b5b5b5',
    fontWeight: '500',
    fontSize: 14,
  },
  footerValueContainer: {},
  footerValue: {
    color: '#dbdbdb',
    fontWeight: '600',
    fontSize: 14,
  },
});

InsightItem.defaultProps = {
  footerLabel: null,
  footerValue: null,
  list: [],
};

InsightItem.propTypes = {
  title: PropTypes.string.isRequired,
  footerLabel: PropTypes.string,
  footerValue: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    timeSpent: PropTypes.number,
    completedCount: PropTypes.number,
  })),
};

export default InsightItem;
