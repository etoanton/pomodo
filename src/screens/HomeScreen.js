import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { addSeconds, differenceInSeconds } from 'date-fns';

import DaysLeftCount from '../components/DaysLeftCount';
import TimerWidget from '../components/TimerWidget';
import HistoryRows from '../components/HistoryRows';
import MinutePicker from '../components/MinutePicker';

import { MAIN_BACKGROUND_COLOR } from '../styles/colors';

const INIT_TIMER_VALUE = 15 * 60;

const HomeScreen = () => {
  const [isPickerVisible, togglePicker] = useState(false);
  const [timerValue, setTimerValue] = useState(INIT_TIMER_VALUE);
  const [timerStarted, toggleStartTimer] = useState(false);
  const [finishTimeStamp, setFinishTimeStamp] = useState(null);
  const [timerId, setTimerId] = useState();

  const startTimer = () => {
    toggleStartTimer(true);
    setFinishTimeStamp(addSeconds(new Date(), timerValue))
  };

  const stopTimer = () => {
    toggleStartTimer(false);
    clearInterval(timerId);
    setTimerValue(INIT_TIMER_VALUE);
  };

  useEffect(() => {
    if (timerStarted) {
      const timerId = setInterval(() => {
        const nextValue = differenceInSeconds(finishTimeStamp, new Date());
        if (nextValue >= 0) {
          setTimerValue(nextValue);
        } else {
          // TODO: PomoDO completed
          stopTimer();
        }
        
      }, 100);
      setTimerId(timerId);
    }
  }, [timerStarted]);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.statsContainer}>
        <View style={styles.itemContainer}>
          <DaysLeftCount label={DaysLeftCount.week} />
        </View>
        <View style={styles.itemContainer}>
          <DaysLeftCount label={DaysLeftCount.month} />
        </View>
        <View style={styles.itemContainer}>
          <DaysLeftCount label={DaysLeftCount.year} />
        </View>
      </View>
      <View style={styles.timerContainer}>
        <TimerWidget
          timerStarted={timerStarted}
          startTimer={startTimer}
          stopTimer={stopTimer}
          timerValue={timerValue}
          togglePicker={togglePicker}
        />
      </View>
      <View style={styles.historyContainer}>
        <HistoryRows />
      </View>

      <MinutePicker
        visible={isPickerVisible}
        value={timerValue}
        setValue={setTimerValue}
        togglePicker={togglePicker} />
    </SafeAreaView>
  );
}

HomeScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: MAIN_BACKGROUND_COLOR,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  itemContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  timerContainer: {
    paddingTop: 20,
    paddingHorizontal: 12,
  },
  historyTabContainer: {
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  historyContainer: {
    flex: 1,
  },
});

export default HomeScreen;
