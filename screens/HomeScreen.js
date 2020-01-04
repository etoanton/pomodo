import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import DaysLeftCount from '../components/DaysLeftCount';
import TimerWidget from '../components/TimerWidget';
import Tabs from '../components/Tabs';
import HistoryRows from '../components/HistoryRows';

const HomeScreen = () => {
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
        <TimerWidget />
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
    paddingTop: 24,
  },
  historyContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
