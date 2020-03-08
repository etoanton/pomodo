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
  RESEST_TIMER: 'reset_timer',
  TICK_TIMER: 'tick_timer',
  UPDATE_STATE: 'update_state',
};

const STATUSES = {
  STARTED: 'started',
  PAUSED: 'paused',
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
        status: STATUSES.STARTED,
        startedAt: now,
        list: nextList,
      };
    }
    case ACTIONS.PAUSE_TIMER: {
      const now = new Date();
      return { ...state, status: STATUSES.PAUSED, pauseStartedAt: now };
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
        };
      });

      return {
        ...state,
        status: STATUSES.STARTED,
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

  const resetTimer = useCallback(() => {
    setTimerId(null);
    dispatch({ type: ACTIONS.RESEST_TIMER });
  }, [dispatch, setTimerId]);

  const tickTimer = useCallback(() => {
    dispatch({ type: ACTIONS.TICK_TIMER });
  }, [dispatch]);

  const updateTimer = useCallback(() => {
    dispatch({ type: ACTIONS.TICK_TIMER });
  }, [dispatch]);

  const isTimerCompleted = state.list.every(item => item.timeCompleted === item.timeTotal);

  // STARTED
  useEffect(() => {
    if (state.status === STATUSES.STARTED && !timerId) {
      const localTimerId = setInterval(tickTimer, 1000);
      setTimerId(localTimerId);
    }
  }, [state.status, timerId, setTimerId, tickTimer]);

  // TODO: PAUSED
  // TODO: RESUMED

  // COMPLETED
  useEffect(() => {
    if (isTimerCompleted) {
      clearInterval(timerId);
      resetTimer();

      /*
        TODO: Save: {
          sessionsCount: 3,
          focusTime: 900,
          startedAt: new Date(),
          finishedAt: new Date(),
        }
      */
    }
  }, [isTimerCompleted, timerId, resetTimer]);

  return (
    <TimerContext.Provider
      value={{
        timerState: state,
        startTimer,
        pauseTimer,
        resumeTimer,
        updateTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

TimerProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export { reducer };

export { TimerProvider };

export default TimerContext;
