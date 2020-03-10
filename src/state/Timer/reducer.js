import {
  addSeconds,
  differenceInSeconds,
  isPast,
} from 'date-fns';

import { generateListOfItems } from '../../utils/timerSetup';
import { ACTIONS, TIMER_STATUSES } from './constants';

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.START_TIMER: {
      return startTimerReducer(state, action);
    }
    case ACTIONS.PAUSE_TIMER: {
      return pauseTimerReducer(state, action);
    }
    case ACTIONS.RESUME_TIMER: {
      return resumeTimerReducer(state, action);
    }
    case ACTIONS.TICK_TIMER: {
      return tickTimerReducer(state, action);
    }
    case ACTIONS.RESTORE_TIMER: {
      return restoreTimerStateReducer(state, action);
    }
    case ACTIONS.COMPLETE_TIMER: {
      return { ...state, status: TIMER_STATUSES.COMPLETED, finishedAt: new Date() };
    }
    case ACTIONS.RESEST_TIMER: {
      return { ...state, status: null };
    }
    default:
      throw new Error();
  }
}

function startTimerReducer(state, action) {
  const now = new Date();
  const {
    focusTime,
    shortBreakTime,
    sessionsCount,
    longBreakTime,
    longBreakPeriodicity,
  } = action.payload;

  const nextList = generateListOfItems({
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
  };
}

function pauseTimerReducer(state) {
  const now = new Date();
  return { ...state, status: TIMER_STATUSES.PAUSED, pauseStartedAt: now };
}

function resumeTimerReducer(state) {
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

function tickTimerReducer(state) {
  const currentTaskIdx = state.list.findIndex(item => item.timeCompleted < item.timeTotal);

  const nextList = state.list.map((item, idx) => {
    if (idx !== currentTaskIdx) return item;

    const now = new Date();
    const nextTimeCompleted = differenceInSeconds(now, item.startedAt);
    const isCurrentCompleted = nextTimeCompleted >= item.timeTotal;

    return {
      ...item,
      timeCompleted: isCurrentCompleted ? item.timeTotal : nextTimeCompleted,
    };
  });

  return { ...state, list: nextList };
}

function updateTimerStateReducer(state) {
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

function restoreTimerStateReducer(state, action) {
  return { ...action.payload };
}

export {
  startTimerReducer,
  pauseTimerReducer,
  tickTimerReducer,
  updateTimerStateReducer,
  restoreTimerStateReducer,
};
export default reducer;
