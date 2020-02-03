import React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const noop = () => {};

const Button = ({
  label = '',
  onPress = noop,
  loading = false,
  btnStyles = {},
}) => {
  return (
    <TouchableOpacity
      style={{ ...styles.submitButtonContainer, ...btnStyles }}
      onPress={!loading ? onPress : noop}
    >
      <View style={styles.btnContent}>
        { loading && <ActivityIndicator size="small" color="#F1F1F1"  /> }
        <Text style={styles.submitButtonText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitButtonContainer: {
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#37853D',
    alignItems: 'center',
  },
  btnContent: {
    flexDirection: 'row',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
});

export default Button;