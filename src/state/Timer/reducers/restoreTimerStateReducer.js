import { isPast } from 'date-fns';

export default function restoreTimerStateReducer(state) {
  const nextList = state.list.map(item => {
    // finish all unfinished
    if (isPast(item.finishedAt) && item.timeCompleted !== item.timeTotal) {
      return {
        ...item,
        timeCompleted: item.timeTotal,
      };
    }

    return item;
  });

  return { ...state, list: nextList };
}
