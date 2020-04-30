import { useEffect } from 'react';

import { cancelAllScheduledNotificationsAsync } from '../../../native/notifications';
import persistTimer from '../persist';

function useCompleteTimer({
  isTimerCompleted,
  timerId,
  setTimerId,
  completeTimer,
}) {
  useEffect(() => {
    if (isTimerCompleted) {
      clearInterval(timerId);
      completeTimer(); // -> dispatch ACTIONS.COMPLETE_TIMER
      persistTimer.clearPersisted();
      cancelAllScheduledNotificationsAsync();
    }
  }, [isTimerCompleted, timerId, setTimerId, completeTimer]);
}

export default useCompleteTimer;
