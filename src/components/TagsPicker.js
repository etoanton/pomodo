import React from 'react';
import { StyleSheet, View, Picker, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import { Tags, useDataFetching } from '../api';

const TagsPicker = ({ value, setValue, visible, togglePicker }) => {
  const { loading, results, error } = useDataFetching(Tags.getTags);

  const values = results.data ? results.data.map(({ id, name }) => ({
    value: id,
    label: name,
  })) : [];

  return (
    visible && (
      <TouchableWithoutFeedback onPress={() => togglePicker(false)}>
        <View style={styles.pickerOverlay}>
          <View style={styles.pickerContainer}>
            { !loading && 
              <Picker
                selectedValue={value}
                onValueChange={v => setValue(v)}
                style={styles.picker}
              >
                {values.map(({ label, value }) => (
                  <Picker.Item
                    key={value}
                    color="#ffffff"
                    label={label}
                    value={value}
                  />
                ))}
              </Picker>
            }
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  );
};

TagsPicker.propTypes = {
  value: PropTypes.any.isRequired,
  visible: PropTypes.bool.isRequired,
  togglePicker: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  pickerOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#27272E',
    height: 200,
  },
  picker: {
    flex: 1,
  },
});

export default TagsPicker;
