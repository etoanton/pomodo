import { startOfYear, addDays, format } from 'date-fns';

const now = new Date();
const firstDayOfTheYear = startOfYear(now);

/*
  1 -> 01.01.2020
  366 -> 31.12.2020
*/
export const getDateBasedOnDayOfYear = num => (
  num > 0 ? addDays(firstDayOfTheYear, num) : firstDayOfTheYear
);
export const getFormattedDateBasedOnDayOfYear = (num, dateFormat = 'yyyy-MM-dd') => format(num > 0 ? addDays(firstDayOfTheYear, num) : firstDayOfTheYear, dateFormat);

/*
  120 -> 2:00
  361 -> 6:01
*/
export const getTimerMSValues = timerValue => {
  const tempMinutesV = Math.trunc(timerValue/60);
  const min = tempMinutesV < 10 ? `0${tempMinutesV}` : tempMinutesV;
  const tempSecondsV = timerValue % 60;
  const sec = tempSecondsV < 10 ? `0${tempSecondsV}` : tempSecondsV;
  return { min, sec };
};
