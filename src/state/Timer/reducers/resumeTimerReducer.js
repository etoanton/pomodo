import {
  addSeconds,
  differenceInSeconds,
} from 'date-fns';

import { TIMER_STATUSES } from '../constants';

export default function resumeTimerReducer(state) {
  const now = new Date();
  const pauseDurationSec = differenceInSeconds(now, state.pauseStartedAt);

  const nextList = state.list.map((item, idx) => {
    if (idx < state.activeTimerItemIdx) return item;

    return {
      ...item,
      startedAt: addSeconds(item.startedAt, pauseDurationSec),
      finishedAt: null,
    };
  });

  return {
    ...state,
    status: TIMER_STATUSES.STARTED,
    pauseStartedAt: null,
    list: nextList,
  };
}
