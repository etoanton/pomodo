import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import * as firebase from 'firebase';

import {
  DaysLeftCount,
  TimerWidget,
  HistoryDots,
} from '../components';

import { MAIN_BACKGROUND_COLOR } from '../styles/colors';


const HomeScreen = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged(currentUser => setUser(currentUser));
  }, []);

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
        <TimerWidget />
      </View>

      {/* Abstract calendar */}
      <View style={styles.historyContainer}>
        <HistoryDots user={user} />
      </View>
    </SafeAreaView>
  );
};

HomeScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: MAIN_BACKGROUND_COLOR,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
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

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default HomeScreen;
