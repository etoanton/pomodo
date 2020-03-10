import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import { TimerContext } from '../state/Timer';
import { MAIN_BACKGROUND_COLOR } from '../styles/colors';
import { Button, TimeBoundaries, SettingsItem } from '../components';
import { calculateDuration, calculateTimeStampBoundaries } from '../utils/timerSetup';

const FOCUS_TIME_OPTIONS = [
  { value: 900, label: '15 minutes' },
  { value: 1200, label: '20 minutes' },
  { value: 1500, label: '25 minutes' },
  { value: 1800, label: '30 minutes' },
  { value: 2100, label: '35 minutes' },
  { value: 2400, label: '40 minutes' },
  { value: 2700, label: '45 minutes' },
];

const SHORT_BREAK_TIME_OPTIONS = [
  { value: 300, label: '5 minutes' },
  { value: 600, label: '10 minutes' },
  { value: 900, label: '15 minutes' },
  { value: 1200, label: '20 minutes' },
];

const SESSION_COUNT_OPTIONS = [
  { value: 1, label: '1 time' },
  { value: 2, label: '2 times' },
  { value: 3, label: '3 times' },
  { value: 4, label: '4 times' },
  { value: 5, label: '5 times' },
  { value: 6, label: '6 times' },
  { value: 7, label: '7 times' },
  { value: 8, label: '8 times' },
  { value: 9, label: '9 times' },
  { value: 10, label: '10 times' },
];

const LONG_BREAK_TIME_OPTIONS = [
  { value: 0, label: 'Disabled' },
  { value: 600, label: '10 minutes' },
  { value: 900, label: '15 minutes' },
  { value: 1200, label: '20 minutes' },
  { value: 1500, label: '25 minutes' },
  { value: 1800, label: '30 minutes' },
];

const LONG_BREAK_PERIODICITY = 4;

const TimerSetupScreen = ({ navigation }) => {
  const [focusTime, setFocusTime] = useState(FOCUS_TIME_OPTIONS[0].value);
  const [shortBreakTime, setShortBreakTime] = useState(SHORT_BREAK_TIME_OPTIONS[0].value);
  const [sessionsCount, setSessionsCount] = useState(SESSION_COUNT_OPTIONS[1].value);
  const [longBreakTime, setLongBreakTime] = useState(LONG_BREAK_TIME_OPTIONS[0].value);

  const duration = calculateDuration({
    focusTime,
    shortBreakTime,
    sessionsCount,
    longBreakTime,
    longBreakPeriodicity: LONG_BREAK_PERIODICITY,
  });

  const { from, to } = calculateTimeStampBoundaries(duration);

  const { startTimer } = useContext(TimerContext);

  const handleStartTimer = () => {
    startTimer({
      focusTime,
      shortBreakTime,
      sessionsCount,
      longBreakTime,
      longBreakPeriodicity: LONG_BREAK_PERIODICITY,
    });
    navigation.navigate('TimerProgress');
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContentContainer}>
        <ScrollView style={styles.contentContainer}>
          <TimeBoundaries from={from} to={to} />
          <View style={styles.settingsItemContainer}>
            <SettingsItem
              settingsLabel="Focus"
              value={focusTime}
              valueList={FOCUS_TIME_OPTIONS}
              onValueChange={v => setFocusTime(v)}
            />
          </View>
          <View style={styles.settingsItemContainer}>
            <SettingsItem
              settingsLabel="Short break"
              value={shortBreakTime}
              valueList={SHORT_BREAK_TIME_OPTIONS}
              onValueChange={v => setShortBreakTime(v)}
            />
          </View>
          <View style={styles.settingsItemContainer}>
            <SettingsItem
              settingsLabel="Sessions"
              value={sessionsCount}
              valueList={SESSION_COUNT_OPTIONS}
              onValueChange={v => setSessionsCount(v)}
            />
          </View>
          <View style={styles.settingsItemContainer}>
            <SettingsItem
              settingsLabel="Long break"
              value={longBreakTime}
              valueList={LONG_BREAK_TIME_OPTIONS}
              onValueChange={v => setLongBreakTime(v)}
            />
          </View>
        </ScrollView>
        <View style={styles.actionListContainer}>
          <View style={styles.actionContainer}>
            <Button label="Start" onPress={handleStartTimer} />
          </View>
          <View style={styles.actionContainer}>
            <Button label="Cancel" onPress={() => navigation.navigate('Home')} btnStyles={styles.cancelBtn} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: MAIN_BACKGROUND_COLOR,
  },
  screenContentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
  },
  settingsItemContainer: {
    marginTop: 12,
  },
  actionListContainer: {},
  actionContainer: {
    marginTop: 10,
  },
  cancelBtn: {
    backgroundColor: '#2F2F38',
  },
});

TimerSetupScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default TimerSetupScreen;
