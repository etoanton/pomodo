import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

const btnHitSlop = {
  top: 10,
  left: 10,
  right: 10,
  bottom: 10,
};

const SettingsItem = ({
  settingsLabel,
  value,
  valueList,
  onValueChange,
}) => {
  const valuesMap = valueList.reduce((acc, v) => {
    acc[v.value] = v.label;
    return acc;
  }, {});

  const handleValueChange = idxOffset => {
    const currentIdx = valueList.findIndex(v => v.value === value);
    let nextIdx = currentIdx + idxOffset;
    if (nextIdx >= valueList.length) {
      nextIdx = 0;
    } else if (nextIdx < 0) {
      nextIdx = valueList.length - 1;
    }
    const nextValue = valueList[nextIdx].value;
    onValueChange(nextValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.settingsLabel}>{settingsLabel}</Text>
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          hitSlop={btnHitSlop}
          style={styles.leftControlContainer}
          onPress={() => handleValueChange(-1)}
        >
          <Ionicons
            style={styles.controlIcon}
            name="md-arrow-dropleft"
            size={32}
            color="#CBCBCB"
          />
        </TouchableOpacity>
        <Text style={styles.controlsLabel}>{valuesMap[value]}</Text>
        <TouchableOpacity
          hitSlop={btnHitSlop}
          style={styles.rightControlContainer}
          onPress={() => handleValueChange(1)}
        >
          <Ionicons
            style={styles.controlIcon}
            name="md-arrow-dropright"
            size={32}
            color="#CBCBCB"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

SettingsItem.propTypes = {
  settingsLabel: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  valueList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onValueChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: '#2F2F38',
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2.5,
  },
  settingsLabel: {
    fontSize: 17,
    color: '#fff',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: 150,
  },
  leftControlContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  rightControlContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  },
  controlIcon: {
    marginTop: -5,
  },
  controlsLabel: {
    flex: 1,
    color: '#C0C0C0',
    fontSize: 18,
    paddingHorizontal: 15,
    textAlign: 'center',
  },
});

export default SettingsItem;
