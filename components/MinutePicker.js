import React from 'react';
import { StyleSheet, View, Picker, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

const values = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90]
  .map(v => ({
    label: `${v}:00`,
    value: v * 60,
  }));

const MinutePicker = ({ value, setValue, visible, togglePicker }) => (
  visible && (
    <TouchableWithoutFeedback onPress={() => togglePicker(false)}>
      <View style={styles.pickerOverlay}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={value}
            onValueChange={setValue}
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
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
);

MinutePicker.propTypes = {
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

export default MinutePicker;
