import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

import { RIGHT_PART } from './constants';

const WidgetControls = ({
  navigation,
  isTimerStarted,
  startTimer,
  resetTimer,
}) => (
  <View style={styles.btnsContainer}>
    <TouchableOpacity
      style={{ ...styles.btn, ...styles.btn__top }}
      onPress={!isTimerStarted ? startTimer : resetTimer}
    >
      <Ionicons
        style={styles.btnIcon}
        name={!isTimerStarted ? 'ios-rocket' : 'ios-trash'}
        size={32}
        color="#F1F1F1"
      />
      <Text style={styles.btnText}>{!isTimerStarted ? 'New Session' : 'Discard'}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={{ ...styles.btn, ...styles.btn__bottom }}
      onPress={() => navigation.navigate('Menu')}
    >
      <Ionicons style={{ ...styles.btnIcon, ...styles.btnIconMenu }} name="ios-more" size={32} color="#F1F1F1" />
      <Text style={styles.btnText}>Menu</Text>
    </TouchableOpacity>
  </View>
);

WidgetControls.propTypes = {
  navigation: PropTypes.object.isRequired,
  isTimerStarted: PropTypes.bool.isRequired,
  startTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  btnsContainer: {
    flex: RIGHT_PART,
  },
  btn: {
    backgroundColor: '#27272E',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  btn__top: {
    flex: 5,
    borderTopRightRadius: 7,
  },
  btn__bottom: {
    flex: 2,
    borderBottomRightRadius: 7,
    borderTopWidth: 1,
    borderTopColor: '#525252',
  },
  btnText: {
    fontFamily: 'System',
    color: '#CFCFCF',
    fontSize: 14,
    letterSpacing: 0.3,
    fontWeight: '500',
  },
  btnIcon: {
    paddingBottom: 4,
  },
  btnIconMenu: {
    marginBottom: -10,
  },
});

export default WidgetControls;
