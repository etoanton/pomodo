import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { addSeconds, differenceInSeconds } from 'date-fns';

import DaysLeftCount from '../components/DaysLeftCount';
import TimerWidget from '../components/TimerWidget';
import HistoryRows from '../components/HistoryRows';
import MinutePicker from '../components/MinutePicker';
import TaskSuccessModal from '../modals/TaskSuccess';
import { MAIN_BACKGROUND_COLOR } from '../styles/colors';

const INIT_TIMER_VALUE = 15 * 60;

const HomeScreen = () => {
  const [isPickerVisible, togglePicker] = useState(false);
  const [isSuccessModalVisible, setModalVisibility] = useState(false);

  const [isTimerStarted, toggleStartTimer] = useState(false);
  const [timerValue, setTimerValue] = useState(INIT_TIMER_VALUE);
  const [finishTimeStamp, setFinishTimeStamp] = useState(null);

  const [completedTimerValue, setCompletedTimerValue] = useState(0);
  const [timerId, setTimerId] = useState(null);

  const startTimer = () => {
    toggleStartTimer(true);

    const nextFinishTimeStamp = addSeconds(new Date(), timerValue);
    setFinishTimeStamp(nextFinishTimeStamp)

    const timerId = setInterval(() => {
      const finishTimeStampValue = finishTimeStamp || nextFinishTimeStamp;
      const nextValue = differenceInSeconds(finishTimeStampValue, new Date());
      if (nextValue >= 0) {
        setTimerValue(nextValue);
      } else {
        clearInterval(timerId);
        completePomodo();
      }
    }, 100);

    setTimerId(timerId);
  };

  const completePomodo = () => {
    setCompletedTimerValue(timerValue);
    setModalVisibility(true);
    cleanUpTimer();
  };

  const discardPomodo = () => {
    setCompletedTimerValue(null);
    cleanUpTimer();
  };

  const cleanUpTimer = () => {
    setTimerValue(INIT_TIMER_VALUE);
    setFinishTimeStamp(null);
    toggleStartTimer(false);
    setTimerId(null);
  };

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
          isTimerStarted={isTimerStarted}
          startTimer={startTimer}
          stopTimer={discardPomodo}
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

      <TaskSuccessModal
        visible={isSuccessModalVisible}
        toggleVisibility={setModalVisibility}
        timeSpent={completedTimerValue}
      />  
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
