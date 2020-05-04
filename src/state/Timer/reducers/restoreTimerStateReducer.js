import { TIMER_STATUSES } from '../constants';

export default function restoreTimerStateReducer(persistedState) {
  return { ...persistedState, status: TIMER_STATUSES.STARTED };
}
