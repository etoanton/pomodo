import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import firebase from './src/api/firebase';
import { TimerProvider } from './src/state/Timer';
import RootNavigator from './src/navigation/Root';
import { Users } from './src/api';
import { MAIN_BACKGROUND_COLOR } from './src/styles/colors';

import { getNotificationPermission } from './src/native/persmissions';

const App = () => {
  const [appLoading, setAppLoading] = useState(true);
  const [isInitialStart, setIsInitial] = useState(true);

  useEffect(() => {
    // TODO: Is it work as expected?
    const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (isInitialStart && !user) {
        await Users.createTemporaryUser();
      }
      setIsInitial(false);
      setAppLoading(false);
    });

    return () => unsubscribe();
  }, [isInitialStart]);

  useEffect(() => {
    getNotificationPermission();
  }, []);

  return (
    <View style={styles.screenContainer}>
      { appLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator />
        </View>
      )}
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
