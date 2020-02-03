import React from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const noop = () => {};

const Button = ({
  label,
  onPress,
  loading,
  btnStyles = {},
}) => (
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

Button.defaultProps = {
  loading: false,
  btnStyles: {},
};

Button.propTypes = {
  loading: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  btnStyles: PropTypes.object,
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
