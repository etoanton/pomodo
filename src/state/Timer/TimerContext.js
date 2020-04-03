import React, {
  useReducer,
  useCallback,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { AppState, Vibration } from 'react-native';

import { scheduleTimerMultipleNotifications, cancelAllScheduledNotificationsAsync } from '../../native/notifications';
import { ACTIONS, TIMER_STATUSES } from './constants';
import reducer from './reducer';
import persistTimer from './persist';

const TimerContext = React.createContext({});

const defaultDate = new Date();

const initialState = {
  startedAt: defaultDate,
  finishedAt: defaultDate,
  pauseStartedAt: null,
  status: null,
  list: [
    {
      id: 'id_1',
      label: 'Focus',
      timeTotal: 900,
      timeCompleted: 0,
      startedAt: defaultDate,
      finishedAt: defaultDate,
    },
    {
      id: 'id_2',
      label: 'Short break',
      timeTotal: 300,
      timeCompleted: 0,
      startedAt: defaultDate,
      finishedAt: defaultDate,
    },
    {
      id: 'id_3',
      label: 'Focus',
      timeTotal: 900,
      timeCompleted: 0,
      startedAt: defaultDate,
      finishedAt: defaultDate,
    },
    {
      id: 'id_4',
      label: 'Short break',
      timeTotal: 300,
      timeCompleted: 0,
      startedAt: defaultDate,
      finishedAt: defaultDate,
    },
  ],
  activeTimerItemIdx: 0,
};

const TimerProvider = ({ children }) => {
  const [timerId, setTimerId] = useState(null);
  const [timerState, dispatch] = useReducer(reducer, initialState);

  const startTimer = useCallback(config => {
    // TODO: Check if not started
    dispatch({ type: ACTIONS.START_TIMER, payload: config });
  }, [dispatch]);

  const completeTimer = useCallback(() => {
    setTimerId(null);
    dispatch({ type: ACTIONS.COMPLETE_TIMER });
  }, [dispatch, setTimerId]);

  const resetTimer = useCallback(() => {
    clearInterval(timerId);
    setTimerId(null);
    dispatch({ type: ACTIONS.RESEST_TIMER });
  }, [dispatch, timerId, setTimerId]);

  const tickTimer = useCallback(() => {
    console.log('tickTimer');
    dispatch({ type: ACTIONS.TICK_TIMER });
  }, [dispatch]);

  const restoreTimer = useCallback(persistedState => {
    dispatch({ type: ACTIONS.RESTORE_TIMER, payload: persistedState });
  }, [dispatch]);

  const totalSessionsCount = timerState.list.length;
  const completedSessionsCount = timerState.list.reduce((acc, item) => {
    if (item.timeCompleted === item.timeTotal) return acc + 1;
    return acc;
  }, 0);

  const isTimerCompleted = totalSessionsCount === completedSessionsCount;

  // INIT app state handler
  useEffect(() => {
    const handleAppStateChange = async nextAppState => {
      if (nextAppState === 'active') {
        const persitedTimer = await persistTimer.getPersisted();
        if (persitedTimer) {
          restoreTimer(persitedTimer);
          return;
        }
      }

      if (nextAppState === 'inactive' || nextAppState === 'background') {
        resetTimer();
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [resetTimer, restoreTimer]);

  // START NEW or RESTORE from `background` state
  useEffect(() => {
    if (timerState.status === TIMER_STATUSES.STARTED && !timerId) {
      const isCleanStart = timerState.list.every(({ timeCompleted }) => timeCompleted === 0);

      const localTimerId = setInterval(tickTimer, 1000);
      setTimerId(localTimerId);

      if (isCleanStart) {
        Vibration.vibrate();

        const notificationsConfig = timerState.list.map(({ finishedAt }, idx) => {
          if (idx === timerState.list.length - 1) {
            return {
              title: 'Session completed',
              body: 'Open app to save progress',
              timeStamp: finishedAt,
            };
          }

          return {
            title: `Completed: ${timerState.list[idx].label}`,
            body: `Next up: ${timerState.list[idx + 1].label}`,
            timeStamp: finishedAt,
          };
        });
        persistTimer.setPersisted(timerState);

        scheduleTimerMultipleNotifications(notificationsConfig);
      }
    }
  }, [timerState.status, timerId, setTimerId, tickTimer, timerState.list]);

  // COMPLETED
  useEffect(() => {
    if (isTimerCompleted) {
      clearInterval(timerId);
      completeTimer(); // -> dispatch ACTIONS.COMPLETE_TIMER
      persistTimer.clearPersisted();
      cancelAllScheduledNotificationsAsync();
    }
  }, [isTimerCompleted, timerId, completeTimer]);

  return (
    <TimerContext.Provider
      value={{
        timerState,
        startTimer,
        resetTimer,
        restoreTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

TimerProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export { TimerContext, TimerProvider, TIMER_STATUSES };

export default TimerContext;
