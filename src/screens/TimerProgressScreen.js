import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import TimerContext from '../state/TimerContext';
import { MAIN_BACKGROUND_COLOR } from '../styles/colors';
import { Button, TimerProgressItem } from '../components';
import { getFormattedTimerValue } from '../utils/dateTooklit';

const TimerProgressScreen = ({ navigation }) => {
  const { timerState: { list } } = useContext(TimerContext);

  const activeItemIdx = list.findIndex(item => item.timeCompleted < item.timeTotal);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContentContainer}>
        <View style={styles.contentContainer}>
          {list.map((item, idx) => {
            const {
              id,
              label,
              timeTotal,
              timeCompleted,
            } = item;

            const minSecTotal = getFormattedTimerValue(timeTotal);
            const minSecCompleted = getFormattedTimerValue(timeCompleted);
            const isActive = idx === activeItemIdx;
            const minSec = !isActive ? minSecTotal : `${minSecCompleted} / ${minSecTotal}`;
            return (
              <View key={id} style={styles.itemContainer}>
                <TimerProgressItem label={label} time={minSec} />
              </View>
            );
          })}
        </View>
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
