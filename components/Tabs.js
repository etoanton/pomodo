import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const Tab = ({ name, handler, active }) => (
  <TouchableOpacity
    style={{ ...styles.tabContainer, backgroundColor: active ? '#DBDBDB' : undefined }}
    onPress={handler}
  >
    <Text
      style={{ ...styles.tabText, color: active ? '#373845' : '#D1D1D1' }}
    >{name}</Text>
  </TouchableOpacity>
);

const Tabs = ({ tabsConfig = [] }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <View style={styles.tabsContainer}>
      {tabsConfig.map(({ name, handler }, idx) => (
        <Tab
          key={name}
          active={idx === activeTabIndex}
          name={name}
          handler={() => {
            handler();
            setActiveTabIndex(idx);
          }}
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
