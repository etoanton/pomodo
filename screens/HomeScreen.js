import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import DaysLeftCount from '../components/DaysLeftCount';
import TimerWidget from '../components/TimerWidget';
import Tabs from '../components/Tabs';
import HistoryRows from '../components/HistoryRows';
import MinutePicker from '../components/MinutePicker';

const INIT_TIMER_VALUE = 15 * 60;

const HomeScreen = () => {
  let timer;
  let initialTinerValue = INIT_TIMER_VALUE;

  const [isPickerVisible, togglePicker] = useState(false);
  const [timerValue, setTimerValue] = useState(INIT_TIMER_VALUE);
  const [timerStarted, toggleStartTimer] = useState(false);

  const decInterval = () => {
    console.log('setInterval', timerValue);
    setTimerValue(timerValue - 1);
  };

  useEffect(() => {
    console.log('useEffect', timerStarted);
    if (timerStarted) {
      initialTinerValue = timerValue;
      timer = setInterval(decInterval, 1000);
    } else {
      clearInterval(timer);
      setTimerValue(initialTinerValue);
    }
  }, [timerStarted]);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.statsContainer}>
        <View style={styles.itemContainer}>
          <DaysLeftCount leftCount={4} label={DaysLeftCount.week} />
        </View>
        <View style={styles.itemContainer}>
          <DaysLeftCount leftCount={22} label={DaysLeftCount.month} />
        </View>
        <View style={styles.itemContainer}>
          <DaysLeftCount leftCount={341} label={DaysLeftCount.year} />
        </View>
      </View>
      <View style={styles.timerContainer}>
        <TimerWidget
          timerStarted={timerStarted}
          toggleStartTimer={toggleStartTimer}
          timerValue={timerValue}
          togglePicker={togglePicker}
        />
      </View>
      <View style={styles.historyTabContainer}>
        <Tabs tabsConfig={[
          {name: 'Days', handler: () => {}},
          {name: 'Weeks', handler: () => {}},
          {name: 'Monthes', handler: () => {}},
          {name: 'Years', handler: () => {}},
        ]} />
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
    backgroundColor: '#373845',
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
    paddingHorizontal: 20,
  },
  historyTabContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  historyContainer: {
    paddingTop: 10,
    flex: 1,
  },
});

export default HomeScreen;
