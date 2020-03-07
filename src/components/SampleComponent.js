import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

const SampleComponent = ({ text }) => (
  <View style={styles.container}>
    <Text>{text}</Text>
  </View>
);

SampleComponent.propTypes = {
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SampleComponent;
