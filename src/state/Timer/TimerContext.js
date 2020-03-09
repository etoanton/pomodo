import React, {
  useReducer,
  useCallback,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { AppState } from 'react-native';

import { ACTIONS, TIMER_STATUSES } from './constants';
import reducer from './reducer';
import persistTimer from './persist';

const TimerContext = React.createContext({});

const initialState = {
  startedAt: null,
  finishedAt: null,
  pauseStartedAt: null,
  status: null,
  list: [{
    label: 'Focus',
    timeTotal: 1200,
    timeCompleted: 0,
    startedAt: null,
    finishedAt: null,
  }],
};

const TimerProvider = ({ children }) => {
  const [timerId, setTimerId] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const startTimer = useCallback(config => {
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
    dispatch({ type: ACTIONS.TICK_TIMER });
  }, [dispatch]);

  const restoreTimer = useCallback(timerState => {
    dispatch({ type: ACTIONS.RESTORE_TIMER, payload: timerState });
  }, [dispatch]);

  const isTimerCompleted = state.list.every(item => item.timeCompleted === item.timeTotal);

  // INIT
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

  // STARTED
  useEffect(() => {
    if (state.status === TIMER_STATUSES.STARTED && !timerId) {
      const localTimerId = setInterval(() => {
        console.log('tickTimer');
        tickTimer();
      }, 1000);
      setTimerId(localTimerId);

      persistTimer.setPersisted(state);
    }
  }, [state.status, timerId, setTimerId, tickTimer]);

  // COMPLETED
  useEffect(() => {
    if (isTimerCompleted) {
      clearInterval(timerId);
      completeTimer();

      /*
        TODO: Save: {
          sessionsCount: 3,
          focusTimePerSession: 900,
          startedAt: new Date(),
          finishedAt: new Date(),
        }
      */
    }
  }, [isTimerCompleted, timerId, completeTimer]);

  return (
    <TimerContext.Provider
      value={{
        timerState: state,
        startTimer,
        resetTimer,
        completeTimer,
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
