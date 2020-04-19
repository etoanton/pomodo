import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import TextInput from '../TextInput';

const InputsGroup = ({ title, fieldsConfig = [], children }) => (
  <View style={styles.inputsGroupContainer}>
    <View style={styles.inputsGroupTitleContainer}>
      <Text style={styles.inputsGroupTitle}>{title}</Text>
    </View>
    <View style={styles.inputsGroup}>
      {fieldsConfig.map(({
        value,
        placeholder,
        onChangeText,
        ...props
      }) => (
        <View style={styles.inputsGroupValueContainer} key={placeholder}>
          <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            {...props}
          />
        </View>
      ))}
    </View>
    {children}
  </View>
);

const INPUT_GROUP_H_PADDING = 12;
const INPUT_GROUP_V_PADDING = 12;

const styles = StyleSheet.create({
  inputsGroupContainer: {},
  inputsGroupTitleContainer: {
    marginBottom: 10,
    marginLeft: INPUT_GROUP_H_PADDING,
  },
  inputsGroupTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  inputsGroup: {
    paddingLeft: INPUT_GROUP_H_PADDING,
    paddingRight: INPUT_GROUP_H_PADDING,
    paddingBottom: INPUT_GROUP_V_PADDING,
    borderRadius: 15,
    backgroundColor: '#3e3f4d',
  },
  inputsGroupValueContainer: {
    marginTop: INPUT_GROUP_V_PADDING,
  },
  inputsGroupExtraLabelContainer: {
    marginTop: 8,
    marginHorizontal: INPUT_GROUP_H_PADDING,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

InputsGroup.propTypes = {
  title: PropTypes.string.isRequired,
  fieldsConfig: PropTypes.array.isRequired,
  children: PropTypes.object.isRequired,
};

export default InputsGroup;
