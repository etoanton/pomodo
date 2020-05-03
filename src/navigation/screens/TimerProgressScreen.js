import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { TIMER_STATUSES } from '../../state/Timer/constants';
import { TimerContext } from '../../state/Timer';
import { MAIN_BACKGROUND_COLOR } from '../../styles/colors';
import { Button, IconButton, TimerProgressItem } from '../../components';

const TimerProgressScreen = ({ navigation }) => {
  const {
    timerState: {
      status,
      list,
      activeTimerItemIdx,
    },
    pauseTimer,
    resumeTimer,
    skipCurrentStep,
  } = useContext(TimerContext);

  const isTimerActive = status === TIMER_STATUSES.STARTED;

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContentContainer}>
        <View style={styles.scrollContainer}>
          <ScrollView style={styles.contentContainer}>
            {list.map((item, idx) => {
              const {
                id,
                label,
                timeTotal,
                timeCompleted,
              } = item;

              const isItemActive = idx === activeTimerItemIdx;

              return (
                <View key={id} style={styles.itemContainer}>
                  <TimerProgressItem
                    label={label}
                    timeTotal={timeTotal}
                    timeCompleted={timeCompleted}
                    isActive={isItemActive}
                    skipCurrentStep={skipCurrentStep}
                  />
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.fixedActionContainer}>
            <IconButton
              icon={isTimerActive ? 'ios-pause' : 'ios-play'}
              onPress={isTimerActive ? pauseTimer : resumeTimer}
              iconSize={21}
            />
          </View>
        </View>
        <View style={styles.actionListContainer}>
          <View style={styles.actionContainer}>
            <Button
              label="Back to home"
              onPress={() => navigation.navigate('Home')}
              btnStyles={styles.cancelBtn}
            />
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
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 15,
  },
  itemContainer: {
    marginTop: 12,
  },
  actionListContainer: {},
  actionContainer: {
    marginTop: 10,
  },
  fixedActionContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  cancelBtn: {
    backgroundColor: '#2F2F38',
  },
});

TimerProgressScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default TimerProgressScreen;
