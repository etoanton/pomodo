import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import './src/api/firebase';
import { TimerProvider } from './src/state/Timer';
import RootNavigator from './src/navigation/Root';
import { MAIN_BACKGROUND_COLOR } from './src/styles/colors';

import { getNotificationPermission } from './src/native/persmissions';

const App = () => {
  useEffect(() => {
    getNotificationPermission();
  }, []);

  return (
    <View style={styles.screenContainer}>
      <TimerProvider>
        <RootNavigator />
      </TimerProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: MAIN_BACKGROUND_COLOR,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  loadingOverlay: {
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MAIN_BACKGROUND_COLOR,
    opacity: 0.7,
  },
});

export default App;
