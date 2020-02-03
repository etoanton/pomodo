import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';

const commonInputProps = {
  clearButtonMode: 'while-editing',
  autoCorrect: false,
  keyboardAppearance: 'dark',
  maxLength: 50,
  placeholderTextColor: '#636572',
  spellCheck: false,
};

const emailCommonProps = {
  autoFocus: true,
  keyboardType: 'email-address',
  placeholder: 'Email',
  textContentType: 'username',
  autoCapitalize: 'none',
};

const passwordCommonProps = {
  placeholder: 'Password',
  secureTextEntry: true,
  textContentType: 'password',
};

const Input = ({
  value,
  type,
  ...props
}) => {
  let configProps = commonInputProps;
  if (type === 'email') configProps = { ...commonInputProps, ...emailCommonProps };
  if (type === 'password') configProps = { ...commonInputProps, ...passwordCommonProps };

  const hasValue = value.length > 0;
  // eslint-disable-next-line react/destructuring-assignment
  const placeholder = props.placeholder || configProps.placeholder;

  return (
    <View style={styles.textInputContainer}>
      <TextInput
        placeholder={placeholder}
        style={{ ...styles.textInput, ...(hasValue ? styles.textInputWithValue : {}) }}
        {...props}
        {...configProps}
      />
      { hasValue && (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>{placeholder}</Text>
        </View>
      ) }
    </View>
  );
};

Input.defaultProps = {
  value: '',
  placeholder: '',
  type: 'default',
};

Input.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['email', 'password']),
};

const styles = StyleSheet.create({
  textInputContainer: {},
  textInput: {
    fontWeight: '300',
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#2F303B',
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 5,
  },
  textInputWithValue: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  placeholderContainer: {
    position: 'absolute',
    top: 6,
    left: 18,
  },
  placeholderText: {
    color: '#999999',
    fontSize: 11,
  },
});

export default Input;
