import { startOfYear, addDays, format } from 'date-fns';

const now = new Date();
const firstDayOfTheYear = startOfYear(now);

export const getDateBasedOnDayOfYear = num => num > 0 ? addDays(firstDayOfTheYear, num) : firstDayOfTheYear;
export const getFormattedDateBasedOnDayOfYear = (num, dateFormat = 'yyyy-MM-dd') => format(num > 0 ? addDays(firstDayOfTheYear, num) : firstDayOfTheYear, dateFormat);