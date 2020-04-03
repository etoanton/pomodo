import {
  addSeconds,
  differenceInSeconds,
} from 'date-fns';

import { TIMER_STATUSES } from '../constants';

export default function resumeTimerReducer(state) {
  const now = new Date();
  const pauseDurationSec = differenceInSeconds(now, state.pauseStartedAt);
  const currentTaskIdx = state.list.findIndex(item => item.timeCompleted < item.timeTotal);

  const nextList = state.list.map((item, idx) => {
    if (idx !== currentTaskIdx) return item;

    return {
      ...item,
      startedAt: addSeconds(item.startedAt, pauseDurationSec),
      finishedAt: addSeconds(item.finishedAt, pauseDurationSec),
    };
  });

  return {
    ...state,
    status: TIMER_STATUSES.STARTED,
    pauseStartedAt: null,
    list: nextList,
  };
}
