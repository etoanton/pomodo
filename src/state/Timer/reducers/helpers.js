import { addSeconds } from 'date-fns';

// eslint-disable-next-line import/prefer-default-export
export const generateInitialListOfItems = ({
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
          id: `id_${idx}`,
          label: 'Short break',
          timeTotal: shortBreakTime,
          timeCompleted: 0,
          startedAt: null,
          finishedAt: null,
        };
      }

      if ((idx + 1) % 2 === 1) {
        return {
          id: `id_${idx}`,
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
          finishedAt: null,
        });
        return acc;
      }

      const prevItem = acc[idx - 1];
      const prevFinishedAt = addSeconds(prevItem.startedAt, prevItem.timeTotal + 0.5);

      acc.push({
        ...item,
        startedAt: prevFinishedAt,
        finishedAt: null,
      });

      return acc;
    }, []);

  return nextList;
};
