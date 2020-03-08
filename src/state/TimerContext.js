import React, {
  useReducer,
  useCallback,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import {
  addSeconds,
  differenceInSeconds,
  isPast,
} from 'date-fns';

import { generateListOfItems } from '../utils/timerSetup';

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

const ACTIONS = {
  START_TIMER: 'start_timer',
  PAUSE_TIMER: 'pause_timer',
  RESUME_TIMER: 'resume_timer',
  COMPLETE_TIMER: 'complete_timer',
  RESEST_TIMER: 'reset_timer',
  TICK_TIMER: 'tick_timer',
  UPDATE_STATE: 'update_state',
};

const TIMER_STATUSES = {
  STARTED: 'started',
  PAUSED: 'paused',
  COMPLETED: 'completed',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.START_TIMER: {
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
    case ACTIONS.PAUSE_TIMER: {
      const now = new Date();
      return { ...state, status: TIMER_STATUSES.PAUSED, pauseStartedAt: now };
    }
    case ACTIONS.RESUME_TIMER: {
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
    case ACTIONS.TICK_TIMER: {
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
    case ACTIONS.UPDATE_STATE: {
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
    case ACTIONS.COMPLETE_TIMER: {
      return { ...state, status: TIMER_STATUSES.COMPLETED };
    }
    case ACTIONS.RESEST_TIMER: {
      return { ...state, status: null };
    }
    default:
      throw new Error();
  }
}

const TimerProvider = ({ children }) => {
  const [timerId, setTimerId] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const startTimer = useCallback(config => {
    dispatch({ type: ACTIONS.START_TIMER, payload: config });
  }, [dispatch]);

  const pauseTimer = useCallback(() => {
    dispatch({ type: ACTIONS.PAUSE_TIMER });
  }, [dispatch]);

  const resumeTimer = useCallback(() => {
    dispatch({ type: ACTIONS.RESUME_TIMER });
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

  const updateTimer = useCallback(() => {
    dispatch({ type: ACTIONS.TICK_TIMER });
  }, [dispatch]);

  const isTimerCompleted = state.list.every(item => item.timeCompleted === item.timeTotal);

  // STARTED
  useEffect(() => {
    if (state.status === TIMER_STATUSES.STARTED && !timerId) {
      const localTimerId = setInterval(() => {
        console.log('tickTimer');
        tickTimer();
      }, 1000);
      setTimerId(localTimerId);

      // TODO: Save in local storage to be able to restore
    }
  }, [state.status, timerId, setTimerId, tickTimer]);

  // TODO: PAUSED
  // TODO: RESUMED

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
        pauseTimer,
        resumeTimer,
        updateTimer,
        resetTimer,
        completeTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

TimerProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export { TimerProvider, TIMER_STATUSES };

export default TimerContext;
