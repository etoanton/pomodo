/* eslint-disable object-curly-newline */
import React, {
  useReducer,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import { TIMER_STATUSES } from './constants';
import reducer from './reducer';
import { initialState } from './reducers/constants';

import {
  useInitializeTimer,
  useInitializePersistence,
  useOnCompleteTimer,
  useOnPauseTimer,
  useInitMethods,
} from './hooks';

const TimerContext = React.createContext({});

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
    skipCurrentStep,
  } = useInitMethods({ dispatch, timerId, setTimerId });

  const isTimerCompleted = timerState.status === TIMER_STATUSES.STARTED
    && timerState.list.every(item => !!item.finishedAt);

  // START NEW or RESTORE from `background` state
  useInitializeTimer({ timerId, setTimerId, calculateNextTickState, timerState });
  useInitializePersistence({ resetTimer, restoreTimer });

  // on status change
  useOnPauseTimer({ timerId, setTimerId, timerStatus: timerState.status });
  useOnCompleteTimer({ isTimerCompleted, timerId, setTimerId, completeTimer });

  const methods = {
    startTimer,
    resetTimer,
    restoreTimer,
    pauseTimer,
    resumeTimer,
    skipCurrentStep,
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
