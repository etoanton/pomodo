import {
  startOfYear,
  addDays,
  addSeconds,
  format,
  formatDistanceStrict,
} from 'date-fns';

/*
  1 -> 01.01.2020
  366 -> 31.12.2020
*/
export const getDateBasedOnDayOfYear = num => {
  const now = new Date();
  const firstDayOfTheYear = startOfYear(now);

  return (
    num > 0 ? addDays(firstDayOfTheYear, num) : firstDayOfTheYear
  );
};

export const getFormattedDateBasedOnDayOfYear = (num, dateFormat = 'yyyy-MM-dd') => {
  const now = new Date();
  const firstDayOfTheYear = startOfYear(now);
  return format(num > 0 ? addDays(firstDayOfTheYear, num) : firstDayOfTheYear, dateFormat);
};

/*
  120 seconds -> 2:00
  361 seconds -> 6:01
*/
export const getFormattedTimerValue = timerValue => {
  const tempMinutesV = Math.trunc(timerValue / 60);
  const min = tempMinutesV < 10 ? `0${tempMinutesV}` : tempMinutesV;
  const tempSecondsV = timerValue % 60;
  const sec = tempSecondsV < 10 ? `0${tempSecondsV}` : tempSecondsV;
  return `${min}:${sec}`;
};

export const getFormattedDistance = seconds => {
  const nowDate = new Date();
  const differenceDate = addSeconds(nowDate, seconds);
  return formatDistanceStrict(nowDate, differenceDate, { roundingMethod: 'floor' });
};
