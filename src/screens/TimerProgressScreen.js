import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { TimerContext } from '../state/Timer';
import { MAIN_BACKGROUND_COLOR } from '../styles/colors';
import { Button, TimerProgressItem } from '../components';

const TimerProgressScreen = ({ navigation }) => {
  const { timerState: { list }, activeTimerItemIdx } = useContext(TimerContext);

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

            const isActive = idx === activeTimerItemIdx;

            return (
              <View key={id} style={styles.itemContainer}>
                <TimerProgressItem
                  label={label}
                  timeTotal={timeTotal}
                  timeCompleted={timeCompleted}
                  isActive={isActive}
                />
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.actionListContainer}>
          <View style={styles.actionContainer}>
            <Button
              label="Cancel"
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
