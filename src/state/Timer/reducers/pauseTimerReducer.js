import { TIMER_STATUSES } from '../constants';

export default function pauseTimerReducer(state) {
  const now = new Date();
  return { ...state, status: TIMER_STATUSES.PAUSED, pauseStartedAt: now };
}
