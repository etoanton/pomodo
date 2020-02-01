import { startOfYear, addDays, format } from 'date-fns';

const now = new Date();
const firstDayOfTheYear = startOfYear(now);

export const generateDateBasedOnNumber = num => format(num > 0 ? addDays(firstDayOfTheYear, num) : firstDayOfTheYear, 'yyyy-MM-dd');