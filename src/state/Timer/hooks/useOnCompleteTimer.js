import { useEffect } from 'react';
import { Audio } from 'expo-av';
import { deactivateKeepAwake } from 'expo-keep-awake';

import { cancelAllScheduledNotificationsAsync } from '../../../native/notifications';
import persistTimer from '../persist';

const playCompleteSound = async () => {
  const soundObject = new Audio.Sound();
  try {
    // eslint-disable-next-line global-require
    await soundObject.loadAsync(require('../../../assets/notification_sound.mp3'));
    await soundObject.playAsync();
    // Your sound is playing!
  } catch (error) {
    // An error occurred!
  }
};

function useCompleteTimer({
  isTimerCompleted,
  timerId,
  setTimerId,
  completeTimer,
}) {
  useEffect(() => {
    if (isTimerCompleted) {
      playCompleteSound();
      deactivateKeepAwake();

      clearInterval(timerId);
      completeTimer(); // -> dispatch ACTIONS.COMPLETE_TIMER
      persistTimer.clearPersisted();
      cancelAllScheduledNotificationsAsync();
    }
  }, [isTimerCompleted, timerId, setTimerId, completeTimer]);
}

export default useCompleteTimer;
