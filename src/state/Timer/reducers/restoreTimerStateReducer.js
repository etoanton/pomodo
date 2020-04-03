import { isPast } from 'date-fns';

import { TIMER_STATUSES } from '../constants';

export default function restoreTimerStateReducer(state) {
  if (state.status === TIMER_STATUSES.PAUSED) {
    return state;
  }

  const nextList = state.list.map(item => {
    // finish all unfinished
    if (isPast(item.finishedAt) && item.timeCompleted !== item.timeTotal) {
      return {
        ...item,
        timeCompleted: item.timeTotal,
      };
    }

    return item;
  });

  return { ...state, list: nextList };
}
