import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const Tab = ({ name, onPress, active }) => (
  <TouchableOpacity
    style={{ ...styles.tabContainer, backgroundColor: active ? '#DBDBDB' : undefined }}
    onPress={onPress}
  >
    <Text
      style={{ ...styles.tabText, color: active ? '#373845' : '#D1D1D1' }}
    >{name}</Text>
  </TouchableOpacity>
);

const Tabs = ({ activeTabId, tabsConfig = [], handlePress }) => {
  return (
    <View style={styles.tabsContainer}>
      {tabsConfig.map(({ id, name }) => (
        <Tab
          key={name}
          active={id === activeTabId}
          name={name}
          onPress={() => handlePress(id)}
        />
      ))}
    </View>
  );
};

Tabs.propTypes = {
  tabsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      handler: PropTypes.func
    })
  ).isRequired,
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tabContainer: {
    width: 75,
    borderRadius: 7,
    paddingVertical: 5,
    alignItems: 'center',
  },
  tabText: {
    fontWeight: '500',
    fontSize: 14,
  },
});

export default Tabs;
