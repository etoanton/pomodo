import { AsyncStorage } from 'react-native';
import {
  parseISO,
  isPast,
  isDate,
  addSeconds,
  differenceInSeconds,
} from 'date-fns';

import { TIMER_STATUSES } from './constants';

const ACTIVE_TIMER_KEY = '@ACTIVE_TIMER';

const parseDate = date => {
  const parsed = parseISO(date);
  return isDate(parsed) ? parsed : null;
};

export const updateTimerState = persistedState => {
  if (persistedState.status === TIMER_STATUSES.PAUSED) {
    // shouldn't be updated
    return persistedState;
  }

  const nextList = persistedState.list.map(item => {
    const finishedAt = item.finishedAt && parseDate(item.finishedAt);

    if (finishedAt) {
      // previously completed
      return item;
    }

    const startedAt = parseDate(item.startedAt);
    const potentialFinishedAt = addSeconds(parseDate(item.startedAt), item.timeTotal);

    if (isPast(potentialFinishedAt)) {
      // should be completed
      return {
        ...item,
        finishedAt: potentialFinishedAt,
        startedAt,
        timeCompleted: item.timeTotal,
      };
    }

    if (isPast(startedAt)) {
      // `timeCompleted` field should be updated
      const now = new Date();
      return {
        ...item,
        timeCompleted: differenceInSeconds(now, startedAt),
      };
    }

    return item;
  });

  return {
    ...persistedState,
    startedAt: parseDate(persistedState.startedAt),
    finishedAt: parseDate(persistedState.finishedAt),
    list: nextList,
  };
};

const persistTimer = {
  setPersisted: async timerState => {
    try {
      await AsyncStorage.removeItem(ACTIVE_TIMER_KEY);
      await AsyncStorage.setItem(ACTIVE_TIMER_KEY, JSON.stringify(timerState));
      return true;
    } catch (e) {
      console.log('ERROR (setPersisted):', e);
      return false;
    }
  },
  getPersisted: async () => {
    try {
      const timerState = await AsyncStorage.getItem(ACTIVE_TIMER_KEY);
      if (timerState !== null) {
        const parsedTimerState = JSON.parse(timerState);
        const state = updateTimerState(parsedTimerState);

        return state;
      }
      return timerState;
    } catch (e) {
      console.log('ERROR (getPersisted):', e);
      return null;
    }
  },
  clearPersisted: async () => {
    try {
      await AsyncStorage.removeItem(ACTIVE_TIMER_KEY);
      return true;
    } catch (e) {
      console.log('ERROR (clearPersisted):', e);
      return false;
    }
  },
};

export default persistTimer;
