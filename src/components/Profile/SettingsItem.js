import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

const SettingsItem = ({ label, children }) => (
  <View style={styles.settingsItemContainer}>
    <View style={styles.settingsItemLabelContainer}>
      <Text style={styles.settingsItemLabel}>{label}</Text>
    </View>
    <View style={styles.settingsItemControlContainer}>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  settingsItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingsItemLabelContainer: {
  },
  settingsItemLabel: {
    color: '#d6d6d6',
    fontWeight: '500',
  },
  settingsItemControlContainer: {},
});

SettingsItem.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default SettingsItem;
