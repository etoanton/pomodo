import { TIMER_STATUSES } from '../constants';

import { generateInitialListOfItems } from './helpers';

export default function startTimerReducer(state, action) {
  const now = new Date();
  const {
    focusTime,
    shortBreakTime,
    sessionsCount,
    longBreakTime,
    longBreakPeriodicity,
  } = action.payload;

  const nextList = generateInitialListOfItems({
    focusTime,
    shortBreakTime,
    sessionsCount,
    longBreakTime,
    longBreakPeriodicity,
  });

  return {
    ...state,
    status: TIMER_STATUSES.STARTED,
    startedAt: now,
    list: nextList,
    activeTimerItemIdx: 0,
  };
}
