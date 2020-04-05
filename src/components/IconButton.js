import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IconButton = ({
  icon,
  iconSize,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.submitButtonContainer}
    onPress={onPress}
  >
    <Ionicons
      name={icon}
      size={iconSize}
      color="#F1F1F1"
    />
  </TouchableOpacity>
);

IconButton.defaultProps = {
  iconSize: 12,
};

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  iconSize: PropTypes.number,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  submitButtonContainer: {
    backgroundColor: '#2F2F38',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default IconButton;
