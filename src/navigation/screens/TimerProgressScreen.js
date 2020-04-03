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
import { Button, TimerProgressItem } from '../../components';

const TimerProgressScreen = ({ navigation }) => {
  const {
    timerState: {
      status,
      list,
      activeTimerItemIdx,
    },
    pauseTimer,
    resumeTimer,
  } = useContext(TimerContext);

  const isTimerActive = status === TIMER_STATUSES.STARTED;

  console.log('list', list);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContentContainer}>
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
                />
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.actionListContainer}>
          <View style={styles.actionContainer}>
            <Button
              label={isTimerActive ? 'Pause' : 'Resume'}
              onPress={isTimerActive ? pauseTimer : resumeTimer}
              btnStyles={styles.cancelBtn}
            />
          </View>

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
  cancelBtn: {
    backgroundColor: '#2F2F38',
  },
});

TimerProgressScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default TimerProgressScreen;
