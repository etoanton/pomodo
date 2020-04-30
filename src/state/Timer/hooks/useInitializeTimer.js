import { useEffect } from 'react';

import { scheduleTimerMultipleNotifications } from '../../../native/notifications';
import persistTimer from '../persist';
import { TIMER_STATUSES } from '../constants';

function useInitializeTimer({
  timerId,
  setTimerId,
  calculateNextTickState,
  timerState,
}) {
  useEffect(() => {
    if (timerState.status === TIMER_STATUSES.STARTED && !timerId) {
      const isCleanStart = timerState.list.every(({ timeCompleted }) => timeCompleted === 0);

      const localTimerId = setInterval(calculateNextTickState, 1000);
      setTimerId(localTimerId);

      // SET NOTIFICATIONS
      if (isCleanStart) {
        const notificationsConfig = timerState.list.map(({ finishedAt }, idx) => {
          if (idx === timerState.list.length - 1) {
            return {
              title: 'Session completed',
              body: 'Open app to save progress',
              timeStamp: finishedAt,
            };
          }

          return {
            title: `Completed: ${timerState.list[idx].label}`,
            body: `Next up: ${timerState.list[idx + 1].label}`,
            timeStamp: finishedAt,
          };
        });

        persistTimer.setPersisted(timerState);

        scheduleTimerMultipleNotifications(notificationsConfig);
      }
    }
  }, [timerId, setTimerId, calculateNextTickState, timerState]);
}

export default useInitializeTimer;
