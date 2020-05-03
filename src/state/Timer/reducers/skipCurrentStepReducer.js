import {
  subSeconds,
} from 'date-fns';

// timeTotal: longBreakTime,
// timeCompleted: 0,
// startedAt: null,
// finishedAt: null,

export default function skipCurrentStepReducer(state) {
  const nextList = state.list.map((item, idx) => {
    if (idx < state.activeTimerItemIdx) return item;

    if (idx === state.activeTimerItemIdx) {
      return {
        ...item,
        finishedAt: new Date(),
      };
    }

    const currentStep = state.list[state.activeTimerItemIdx];
    const remainingTime = currentStep.timeTotal - currentStep.timeCompleted;

    return {
      ...item,
      startedAt: subSeconds(item.startedAt, remainingTime),
      finishedAt: null,
    };
  });

  const nextActiveTimerItemIdx = state.activeTimerItemIdx < (state.list.length - 1)
    ? state.activeTimerItemIdx + 1 : state.activeTimerItemIdx;

  return {
    ...state,
    activeTimerItemIdx: nextActiveTimerItemIdx,
    list: nextList,
  };
}
