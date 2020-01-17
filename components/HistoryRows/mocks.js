import { startOfYear, addDays, format } from 'date-fns';

const ROW_ELEMENT_COUNT = 10;

const now = new Date();
const firstDayOfTheYear = startOfYear(now);
const generateDateBasedOnNumber = num => format(addDays(firstDayOfTheYear, num), 'yyyy-MM-dd');

const DAYS_COUNT = 366;
const daysList = Array(DAYS_COUNT).fill(0).map((_, rowIdx) => {
  const keys = [generateDateBasedOnNumber(rowIdx)];
  return ({
    id: rowIdx,
    completedTasks: [],
    keys,
  });
});

const WEEKS_COUNT = 53;
const weeksList = Array(WEEKS_COUNT).fill(0).map((_, rowIdx) => {
  const weekDays = Array(7).fill(0);
  const keys = weekDays.map((_, weekIdx) => generateDateBasedOnNumber(7 * rowIdx + weekIdx));
  return ({
    id: rowIdx,
    completedTasks: [],
    keys,
  });
});


const MONTHES_COUNT = 12;
const monthesList = Array(MONTHES_COUNT).fill(0).map((_, rowIdx) => {
  return ({
    id: rowIdx,
    completedTasks: [],
    keys: [],
  });
});

const separateToRows = data => {
  const separatedData = [];
  for (let idx = 0; idx < data.length; idx = idx + ROW_ELEMENT_COUNT) {
    separatedData.push({ id: idx, data: data.slice(idx, idx + ROW_ELEMENT_COUNT) })
  }
  return separatedData;
}

const daysData = separateToRows(daysList);
const weeksData = separateToRows(weeksList);
const monthesData = separateToRows(monthesList);

export { daysData, weeksData, monthesData };