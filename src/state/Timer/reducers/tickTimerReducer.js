import {
  differenceInSeconds,
} from 'date-fns';

export default function tickTimerReducer(state) {
  const activeTimerItemIdx = state.list.findIndex(item => item.timeCompleted < item.timeTotal);

  const nextList = state.list.map((item, idx) => {
    if (idx !== activeTimerItemIdx) return item;

    const now = new Date();
    const nextTimeCompleted = differenceInSeconds(now, item.startedAt);
    const isCurrentCompleted = nextTimeCompleted >= item.timeTotal;

    return {
      ...item,
      timeCompleted: isCurrentCompleted ? item.timeTotal : nextTimeCompleted,
    };
  });

  return { ...state, list: nextList, activeTimerItemIdx };
}
