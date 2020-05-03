/* eslint-disable import/prefer-default-export */
const defaultDate = new Date();

export const initialState = {
  startedAt: defaultDate,
  finishedAt: defaultDate,
  pauseStartedAt: null,
  status: null,
  list: [
    {
      id: 'id_1',
      label: 'Focus',
      timeTotal: 900,
      timeCompleted: 0,
      startedAt: defaultDate,
      finishedAt: null,
    },
    {
      id: 'id_2',
      label: 'Short break',
      timeTotal: 300,
      timeCompleted: 0,
      startedAt: defaultDate,
      finishedAt: null,
    },
    {
      id: 'id_3',
      label: 'Focus',
      timeTotal: 900,
      timeCompleted: 0,
      startedAt: defaultDate,
      finishedAt: null,
    },
    {
      id: 'id_4',
      label: 'Short break',
      timeTotal: 300,
      timeCompleted: 0,
      startedAt: defaultDate,
      finishedAt: null,
    },
  ],
  activeTimerItemIdx: -1,
};
