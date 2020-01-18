import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const ProgressBar = ({ completed }) => (
  <View style={styles.container}>
    <View style={{ ...styles.filledContainer, width: `${completed * 100}%` }} />
  </View>
);

ProgressBar.propTypes = {
  completed: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    height: 3,
    backgroundColor: '#DFDFDF',
    borderRadius: 7,
  },
  filledContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 7,
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#67B78F',
  },
});

export default ProgressBar;