import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export const Tab = ({ name, onPress, active }) => (
  <TouchableOpacity
    style={{ ...styles.tabContainer, backgroundColor: active ? '#DBDBDB' : undefined }}
    onPress={onPress}
  >
    <Text style={{ ...styles.tabText, color: active ? '#373845' : '#D1D1D1' }}>{name}</Text>
  </TouchableOpacity>
);

Tab.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

const Tabs = ({
  activeTabId,
  tabsConfig,
  handlePress,
  scrollToday,
}) => (
  <View style={styles.tabsContainer}>
    {tabsConfig.map(({ id, name }) => (
      <Tab
        key={name}
        active={id === activeTabId}
        name={name}
        onPress={() => handlePress(id)}
      />
    ))}

    <TouchableOpacity style={styles.todayBtn} onPress={scrollToday}>
      <Text style={styles.todayBtnText}>Today</Text>
    </TouchableOpacity>
  </View>
);

Tabs.propTypes = {
  activeTabId: PropTypes.string.isRequired,
  tabsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      handler: PropTypes.func,
    }),
  ).isRequired,
  handlePress: PropTypes.func.isRequired,
  scrollToday: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  tabsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  separator: {
    width: 1,
    height: 30,
    backgroundColor: '#fafafa',
  },
  todayBtn: {
    width: 50,
    alignItems: 'center',
    borderRadius: 7,
    paddingVertical: 5,
  },
  todayBtnText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#67B78F',
  },
});

export default Tabs;
