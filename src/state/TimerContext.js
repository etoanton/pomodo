import React, { useReducer, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  addSeconds,
  differenceInSeconds,
} from 'date-fns';

import { generateListOfItems } from '../utils/timerSetup';

const TimerContext = React.createContext({});

const ACTIONS = {
  START_TIMER: 'start_timer',
  PAUSE_TIMER: 'pause_timer',
  RESUME_TIMER: 'resume_timer',
  TICK_TIMER: 'tick_timer',
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

        return {
          ...item,
          timeCompleted: nextTimeCompleted >= item.timeTotal ? item.timeTotal : nextTimeCompleted,
        };
      });

      return { ...state, list: nextList };
    }
    default:
      throw new Error();
  }
}

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
  }],
};

const TimerProvider = ({ children }) => {
  // const [timerId, setTimerId] = useState(0);
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

  // useEffect(() => {
  //   if (state.status === STATUSES.STARTED) {
  //     const localTimerId = setInterval(() => {
  //       dispatch({ type: ACTIONS.TICK_TIMER });
  //     }, 500);
  //     setTimerId(localTimerId);
  //   }

  //   if (state.status === STATUSES.PAUSED) {
  //     clearInterval(timerId);
  //   }
  // }, [state.status, dispatch]);

  console.log('TimerContext', state);

  return (
    <TimerContext.Provider
      value={{
        timerState: state,
        startTimer,
        pauseTimer,
        resumeTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

TimerProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export { TimerProvider };

export default TimerContext;
