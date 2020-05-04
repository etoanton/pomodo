import { AsyncStorage } from 'react-native';
import {
  parseISO,
  isPast,
  isDate,
  addSeconds,
  differenceInSeconds,
} from 'date-fns';

const ACTIVE_TIMER_KEY = '@ACTIVE_TIMER';

const parseDate = date => {
  const parsed = date ? parseISO(date) : null;
  return isDate(parsed) ? parsed : null;
};

const updateTimerState = persistedState => {
  const nextList = persistedState.list.map(item => {
    const potentialFinishedAt = addSeconds(parseDate(item.startedAt), item.timeTotal);

    const startedAt = parseDate(item.startedAt);
    const finishedAt = parseDate(item.finishedAt);

    if (finishedAt) {
      // previously completed
      return item;
    }

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

        console.log('updateTimerState', state);

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
