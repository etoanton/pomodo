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
      if (longBreakTime !== 0 && (idx + 1) % (longBreakPeriodicity * 2) === 0) {
        return {
          id: `id_${idx}`,
          label: 'Long break',
          timeTotal: longBreakTime,
          timeCompleted: 0,
          startedAt: null,
          finishedAt: null,
        };
      }

      if ((idx + 1) % 2 === 0) {
        return {
          id: idx,
          label: 'Short break',
          timeTotal: shortBreakTime,
          timeCompleted: 0,
          startedAt: null,
          finishedAt: null,
        };
      }

      if ((idx + 1) % 2 === 1) {
        return {
          id: idx,
          label: 'Focus',
          timeTotal: focusTime,
          timeCompleted: 0,
          startedAt: null,
          finishedAt: null,
        };
      }

      return null;
    })
    .reduce((acc, item, idx) => {
      if (idx === 0) {
        const now = new Date();
        acc.push({
          ...item,
          startedAt: now,
          finishedAt: addSeconds(now, item.timeTotal),
        });
        return acc;
      }

      const prevFinishedAt = acc[idx - 1].finishedAt;
      acc.push({
        ...item,
        startedAt: prevFinishedAt,
        finishedAt: addSeconds(prevFinishedAt, item.timeTotal),
      });

      return acc;
    }, []);

  return nextList;
};

export const calculateTimeStampBoundaries = duration => {
  const now = new Date();
  const from = format(now, 'HH:mm');
  const to = format(addSeconds(now, duration), 'HH:mm');
  return { from, to };
};
