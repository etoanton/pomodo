import React, { useEffect, useContext } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import * as firebase from 'firebase';

import { TimerContext, TIMER_STATUSES } from '../../state/Timer';
import TimerClock from '../TimerClock';
import { LEFT_PART, RIGHT_PART } from './constants';
import WidgetControls from './WidgetControls';

const { width: screenWidth } = Dimensions.get('window');

const HORIZONTAL_SCREEN_OFFSET = 12;
const HORIZONTAL_TIMER_OFFSET = 20;
const WIDGET_HEIGHT = 255;
const widgetWidth = screenWidth - HORIZONTAL_SCREEN_OFFSET * 2;
const timerContainerWidth = (widgetWidth * LEFT_PART) / (LEFT_PART + RIGHT_PART);
const timerRadius = Math.min(
  (WIDGET_HEIGHT - 30) / 2, (timerContainerWidth - (HORIZONTAL_TIMER_OFFSET * 2)) / 2,
);

const INIT_TIMER_VALUE = 15 * 60;

const btnHitSlop = {
  top: 10,
  left: 10,
  right: 10,
  bottom: 10,
};

const TimerWidget = ({ navigation }) => {
  const {
    timerState: { status, list = [], activeTimerItemIdx },
    resetTimer,
  } = useContext(TimerContext);

  const isTimerStarted = status === TIMER_STATUSES.STARTED || status === TIMER_STATUSES.PAUSED;
  const activeItem = list[activeTimerItemIdx];
  const timerValue = (isTimerStarted && activeItem)
    ? (activeItem.timeTotal - activeItem.timeCompleted) : INIT_TIMER_VALUE;

  useEffect(() => {
    // TIMER COMPLETED!
    if (status === TIMER_STATUSES.COMPLETED) {
      navigation.navigate('SessionComplete');
    }
  }, [status]);

  const startTimerSetup = () => {
    const { currentUser } = firebase.auth();

    if (!currentUser || currentUser.isAnonymous) {
      navigation.navigate('SignIn');
      return;
    }

    if (!isTimerStarted) {
      navigation.navigate('TimerSetup');
    } else {
      navigation.navigate('TimerProgress');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        { isTimerStarted && (
          <TouchableOpacity
            style={styles.fullScreenBtn}
            onPress={startTimerSetup}
            hitSlop={btnHitSlop}
          >
            <MaterialIcons name="fullscreen" size={32} color="#CFCFCF" />
          </TouchableOpacity>
        )}
        <TimerClock
          radius={timerRadius}
          timerValue={timerValue}
          taskLisk={list}
          activeTimerItemIdx={activeTimerItemIdx}
        />
      </View>
      <WidgetControls
        navigation={navigation}
        isTimerStarted={isTimerStarted}
        startTimer={startTimerSetup}
        resetTimer={resetTimer}
      />

      {/* <TaskSuccessModal
        visible={isSuccessModalVisible}
        toggleVisibility={setModalVisibility}
        timeSpent={completedTimerValue}
      /> */}
    </View>
  );
};

TimerWidget.propTypes = {
  navigation: PropTypes.object.isRequired,
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
});

export default withNavigation(TimerWidget);
