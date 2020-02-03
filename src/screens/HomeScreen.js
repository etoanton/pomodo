import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { addSeconds, differenceInSeconds } from 'date-fns';

import {
  DaysLeftCount,
  TimerWidget,
  HistoryRows,
  MinutePicker,
} from '../components';

import { TaskSuccessModal } from '../modals';
import { MAIN_BACKGROUND_COLOR } from '../styles/colors';
import AppStateContext from '../AppStateContext';

const INIT_TIMER_VALUE = 15 * 60;

const HomeScreen = ({ navigation }) => {
  const { user, loading: userLoading } = useContext(AppStateContext);

  const [isPickerVisible, togglePicker] = useState(false);
  const [isSuccessModalVisible, setModalVisibility] = useState(false);

  const [isTimerStarted, toggleStartTimer] = useState(false);
  const [timerValue, setTimerValue] = useState(INIT_TIMER_VALUE);
  const [finishTimeStamp, setFinishTimeStamp] = useState(null);

  const [timerId, setTimerId] = useState(0);
  const [completedTimerValue, setCompletedTimerValue] = useState(0);

  const startTimer = () => {
    if (!user) {
      if (userLoading) return;
      navigation.navigate('SignIn');
      return;
    }

    toggleStartTimer(true);
    const nextFinishTimeStamp = addSeconds(new Date(), timerValue);
    setFinishTimeStamp(nextFinishTimeStamp);

    const localTimerId = setInterval(() => {
      const finishTimeStampValue = finishTimeStamp || nextFinishTimeStamp;
      const nextValue = differenceInSeconds(finishTimeStampValue, new Date());
      if (nextValue >= 0) {
        setTimerValue(nextValue);
      } else {
        clearInterval(localTimerId);
        completePomodo();
      }
    }, 500);
    setTimerId(localTimerId);
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
    if (timerId) clearInterval(timerId);
    setTimerValue(INIT_TIMER_VALUE);
    setFinishTimeStamp(null);
    toggleStartTimer(false);
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      {/* Days left count */}
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

      {/* Timer + Control Buttons */}
      <View style={styles.timerContainer}>
        <TimerWidget
          timerValue={timerValue}
          isTimerStarted={isTimerStarted}
          startTimer={startTimer}
          stopTimer={discardPomodo}
          togglePicker={togglePicker}
        />
      </View>

      {/* Abstract calendar */}
      <View style={styles.historyContainer}>
        <HistoryRows user={user} />
      </View>

      {/* Modals & Pickers */}
      <MinutePicker
        visible={isPickerVisible}
        value={timerValue}
        setValue={setTimerValue}
        togglePicker={togglePicker}
      />

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
