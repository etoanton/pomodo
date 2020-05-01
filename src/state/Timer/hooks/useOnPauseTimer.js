import { useEffect } from 'react';

import { TIMER_STATUSES } from '../constants';

function usePauseTimer({
  timerId,
  setTimerId,
  timerStatus,
}) {
  useEffect(() => {
    if (timerStatus === TIMER_STATUSES.PAUSED && timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  }, [timerStatus, timerId, setTimerId]);
}

export default usePauseTimer;
