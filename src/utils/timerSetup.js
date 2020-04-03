import {
  addSeconds,
  format,
} from 'date-fns';

export const calculateDuration = ({
  focusTime,
  shortBreakTime,
  sessionsCount,
  longBreakTime,
  longBreakPeriodicity,
}) => {
  const longBreakCount = Math.trunc(sessionsCount / longBreakPeriodicity);
  return (focusTime + shortBreakTime) * sessionsCount + longBreakCount * longBreakTime;
};

export const calculateTimeStampBoundaries = duration => {
  const now = new Date();
  const from = format(now, 'HH:mm');
  const to = format(addSeconds(now, duration), 'HH:mm');
  return { from, to };
};
