/* eslint-disable object-curly-newline */
import React, {
  useReducer,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import { TIMER_STATUSES } from './constants';
import reducer from './reducer';

import {
  useInitializeTimer,
  useInitializePersistence,
  useCompleteTimer,
  usePauseTimer,
  useInitMethods,
} from './hooks';

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

  const {
    startTimer,
    pauseTimer,
    resumeTimer,
    completeTimer,
    resetTimer,
    calculateNextTickState,
    restoreTimer,
  } = useInitMethods({ dispatch, timerId, setTimerId });

  const totalSessionsCount = timerState.list.length;
  const completedSessionsCount = timerState.list.reduce((acc, item) => {
    if (item.timeCompleted === item.timeTotal) return acc + 1;
    return acc;
  }, 0);

  const isTimerCompleted = totalSessionsCount === completedSessionsCount;

  useInitializePersistence({ resetTimer, restoreTimer });

  // START NEW or RESTORE from `background` state
  useInitializeTimer({ timerId, setTimerId, calculateNextTickState, timerState });
  usePauseTimer({ timerId, setTimerId, timerStatus: timerState.status });
  useCompleteTimer({ isTimerCompleted, timerId, setTimerId, completeTimer });

  const methods = {
    startTimer,
    resetTimer,
    restoreTimer,
    pauseTimer,
    resumeTimer,
  };

  return (
    <TimerContext.Provider value={{ timerState, ...methods }}>
      {children}
    </TimerContext.Provider>
  );
};

TimerProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export { TimerContext, TimerProvider, TIMER_STATUSES };

export default TimerContext;
