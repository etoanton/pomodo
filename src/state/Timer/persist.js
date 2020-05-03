import { AsyncStorage } from 'react-native';
import { parseISO, isPast, isDate } from 'date-fns';

const ACTIVE_TIMER_KEY = '@ACTIVE_TIMER';

const parseDate = date => {
  const parsed = parseISO(date);
  return isDate(parsed) ? parsed : null;
};

const updateTimerState = persistedState => {
  const nextList = persistedState.list.map(item => {
    const finishedAt = parseDate(item.finishedAt);
    return {
      ...item,
      finishedAt,
      startedAt: parseDate(item.startedAt),
      timeCompleted: finishedAt && isPast(finishedAt) ? item.timeTotal : item.timeCompleted,
    };
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

        // console.log('state', state);

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
