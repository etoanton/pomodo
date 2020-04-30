import { useEffect } from 'react';
import { AppState } from 'react-native';

import persistTimer from '../persist';

function useInitializePersistence({ restoreTimer, resetTimer }) {
  useEffect(() => {
    const handleAppStateChange = async nextAppState => {
      if (nextAppState === 'active') {
        const persitedTimer = await persistTimer.getPersisted();
        if (persitedTimer) {
          restoreTimer(persitedTimer);
          return;
        }
      }

      if (nextAppState === 'inactive' || nextAppState === 'background') {
        resetTimer();
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [resetTimer, restoreTimer]);
}

export default useInitializePersistence;
