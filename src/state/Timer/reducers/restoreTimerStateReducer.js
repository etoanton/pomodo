import { isPast, addSeconds } from 'date-fns';

import { TIMER_STATUSES } from '../constants';

export default function restoreTimerStateReducer(persistedState) {
  const nextList = persistedState.list.map(item => {
    // finish all unfinished
    const finishedAt = addSeconds(item.startedAt, item.timeTotal);
    if (!item.finishedAt && isPast(finishedAt)) {
      return {
        ...item,
        timeCompleted: item.timeTotal,
        finishedAt,
      };
    }

    return item;
  });

  return { ...persistedState, status: TIMER_STATUSES.STARTED, list: nextList };
}
