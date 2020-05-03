import {
  differenceInSeconds,
} from 'date-fns';

export default function nextTickTimerReducer(state) {
  const activeTimerItemIdx = state.list.findIndex(
    item => item.timeCompleted < item.timeTotal && !item.finishedAt,
  );

  const nextList = state.list.map((item, idx) => {
    if (idx !== activeTimerItemIdx) return item;

    const now = new Date();
    const nextTimeCompleted = differenceInSeconds(now, item.startedAt);
    const isCurrentCompleted = nextTimeCompleted >= item.timeTotal;

    return {
      ...item,
      timeCompleted: isCurrentCompleted ? item.timeTotal : nextTimeCompleted,
      finishedAt: isCurrentCompleted ? now : null,
    };
  });

  return { ...state, list: nextList, activeTimerItemIdx };
}
