import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import TimerClock from './TimerClock';

const { width: screenWidth } = Dimensions.get('window');

const LEFT_PART = 8;
const RIGHT_PART = 3;

const HORIZONTAL_SCREEN_OFFSET = 12;
const HORIZONTAL_TIMER_OFFSET = 20;
const WIDGET_HEIGHT = 255;
const widgetWidth = screenWidth - HORIZONTAL_SCREEN_OFFSET * 2;
const timerContainerWidth = (widgetWidth * LEFT_PART) / (LEFT_PART + RIGHT_PART);
const timerRadius = Math.min(
  (WIDGET_HEIGHT - 30) / 2, (timerContainerWidth - (HORIZONTAL_TIMER_OFFSET * 2)) / 2,
);

const TimerWidget = ({
  isTimerStarted,
  startTimer,
  stopTimer,
  navigation,
  onExpandPress,
  ...props
}) => (
  <View style={styles.container}>
    <View style={styles.timerContainer}>
      <TouchableOpacity
        style={styles.fullScreenBtn}
        onPress={onExpandPress}
        hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
      >
        <MaterialIcons name="fullscreen" size={32} color="#CFCFCF" />
      </TouchableOpacity>
      <TimerClock
        radius={timerRadius}
        isTimerStarted={isTimerStarted}
        {...props}
      />
    </View>
    <View style={styles.btnsContainer}>
      <TouchableOpacity
        style={{ ...styles.btn, ...styles.btn__top }}
        onPress={!isTimerStarted ? startTimer : stopTimer}
      >
        <Ionicons
          style={styles.btnIcon}
          name={!isTimerStarted ? 'ios-rocket' : 'ios-trash'}
          size={32}
          color="#F1F1F1"
        />
        <Text style={styles.btnText}>{!isTimerStarted ? 'Start Timer' : 'Discard'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.btn, ...styles.btn__bottom }}
        onPress={() => navigation.navigate('Menu')}
      >
        <Ionicons style={{ ...styles.btnIcon, ...styles.btnIconMenu }} name="ios-more" size={32} color="#F1F1F1" />
        <Text style={styles.btnText}>Menu</Text>
      </TouchableOpacity>
    </View>
  </View>
);

TimerWidget.propTypes = {
  navigation: PropTypes.object.isRequired,
  isTimerStarted: PropTypes.bool.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  onExpandPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2F2F38',
    borderRadius: 7,
    minHeight: WIDGET_HEIGHT,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2.5,
  },
  fullScreenBtn: {
    position: 'absolute',
    top: -5,
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

export default withNavigation(TimerWidget);
