import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import Timer from './Timer';

const LEFT_PART = 8;
const RIGHT_PART = 3;

const TimerWidget = ({ timerStarted, toggleStartTimer, ...props }) => (
  <View style={styles.container}>
    <View style={styles.timerContainer}>
      <TouchableOpacity
        style={styles.fullScreenBtn}
        hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
      >
        <MaterialIcons name="fullscreen" size={32} color="#CFCFCF" />
      </TouchableOpacity>
      <Timer
        radius={105}
        {...props}
      />
    </View>
    <View style={styles.btnsContainer}>
      {!timerStarted ? (
        <TouchableOpacity
          style={{ ...styles.btn, ...styles.btn__top }}
          onPress={() => toggleStartTimer(true)}
        >
          <Ionicons style={styles.btnIcon} name="ios-rocket" size={32} color="#F1F1F1" />
          <Text style={styles.btnText}>Start Timer</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{ ...styles.btn, ...styles.btn__top }}
          onPress={() => toggleStartTimer(false)}
        >
          <Ionicons style={styles.btnIcon} name="ios-stopwatch" size={32} color="#F1F1F1" />
          <Text style={styles.btnText}>Stop Timer</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={{ ...styles.btn, ...styles.btn__bottom }}>
        <Ionicons style={{ ...styles.btnIcon, ...styles.btnIconMenu }} name="ios-more" size={32} color="#F1F1F1" />
        <Text style={styles.btnText}>Menu</Text>
      </TouchableOpacity>
    </View>
  </View>
);

TimerWidget.propTypes = {
  timerStarted: PropTypes.bool.isRequired,
  toggleStartTimer: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2F2F38',
    borderRadius: 7,
    minHeight: 252,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2.5,
  },
  fullScreenBtn: {
    position: 'absolute',
    top: -10,
    right: 10,
    zIndex: 10,
  },
  timerContainer: {
    flex: LEFT_PART,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnsContainer: {
    flex: RIGHT_PART,
  },
  btn: {
    backgroundColor: '#27272E',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  btn__top: {
    flex: 2,
    borderTopRightRadius: 7,
  },
  btn__bottom: {
    borderBottomRightRadius: 7,
    borderTopWidth: 1,
    borderTopColor: '#525252'
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
    marginBottom: -10
  },
});

export default TimerWidget;