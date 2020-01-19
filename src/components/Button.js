import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const noop = () => {};

const Button = ({
  label = '',
  onPress = noop,
  btnStyles = {},
}) => {
  return (
    <TouchableOpacity
      style={{ ...styles.submitButton, ...btnStyles }}
      onPress={onPress}
    >
      <Text style={styles.submitButtonText}>{label}</Text>
    </TouchableOpacity>
  );    
};

const styles = StyleSheet.create({
  submitButton: {
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#37853D',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Button;