
import { ACTIONS, TIMER_STATUSES } from './constants';

import {
  startTimerReducer,
  pauseTimerReducer,
  resumeTimerReducer,
  nextTickTimerReducer,
  restoreTimerStateReducer,
} from './reducers';

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.START_TIMER: {
      return startTimerReducer(state, action);
    }
    case ACTIONS.PAUSE_TIMER: {
      return pauseTimerReducer(state, action);
    }
    case ACTIONS.RESUME_TIMER: {
      return resumeTimerReducer(state, action);
    }
    case ACTIONS.NEXT_TICK_TIMER: {
      return nextTickTimerReducer(state, action);
    }
    case ACTIONS.RESTORE_TIMER: {
      return restoreTimerStateReducer(state, action);
    }
    case ACTIONS.COMPLETE_TIMER: {
      return {
        ...state,
        status: TIMER_STATUSES.COMPLETED,
        finishedAt: new Date(),
        activeTimerItemIdx: -1,
      };
    }
    case ACTIONS.RESEST_TIMER: {
      return { ...state, status: null };
    }
    default:
      throw new Error();
  }
}

export default reducer;
