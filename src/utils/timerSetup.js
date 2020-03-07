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

export const generateListOfItems = ({
  focusTime,
  shortBreakTime,
  sessionsCount,
  longBreakTime,
  longBreakPeriodicity,
}) => {
  const longBreakCount = Math.trunc(sessionsCount / longBreakPeriodicity);
  const listLength = sessionsCount * 2 + longBreakCount - 1 * (longBreakCount > 0 ? 1 : 0);

  const nextList = Array(listLength).fill(0)
    .map((_, idx) => {
      if ((idx + 1) % (longBreakPeriodicity * 2) === 0) {
        return {
          label: 'Long break',
          timeTotal: longBreakTime,
          timeCompleted: 0,
          startedAt: null,
        };
      }

      if ((idx + 1) % 2 === 0) {
        return {
          label: 'Short break',
          timeTotal: shortBreakTime,
          timeCompleted: 0,
          startedAt: null,
        };
      }

      if ((idx + 1) % 2 === 1) {
        return {
          label: 'Focus',
          timeTotal: focusTime,
          timeCompleted: 0,
          startedAt: null,
        };
      }

      return null;
    })
    .filter(v => v);

  return nextList;
};

export const calculateTimeStampBoundaries = duration => {
  const now = new Date();
  const from = format(now, 'HH:mm');
  const to = format(addSeconds(now, duration), 'HH:mm');
  return { from, to };
};
