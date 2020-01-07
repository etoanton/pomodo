const ROW_ELEMENT_COUNT = 10;

const separateToTow = data => {
  const separatedData = [];
  for (let idx = 0; idx < data.length; idx = idx + ROW_ELEMENT_COUNT) {
    separatedData.push({ id: idx, data: data.slice(idx, idx + ROW_ELEMENT_COUNT) })
  }
  return separatedData;
}

const DAYS_COUNT = 365;
const daysList = Array(DAYS_COUNT).fill(0).map((_, rowIdx) => {
  const hasCompletedTasks = Math.random() < 0.5;
  return ({
    id: rowIdx,
    hasCompletedTasks,
    completedCount: hasCompletedTasks ? Math.trunc(Math.random() * 10) : 0,
  });
});

const WEEKS_COUNT = 53;
const weeksList = Array(WEEKS_COUNT).fill(0).map((_, rowIdx) => {
  const hasCompletedTasks = Math.random() < 0.5;
  return ({
    id: rowIdx,
    hasCompletedTasks,
    completedCount: hasCompletedTasks ? Math.trunc(Math.random() * 10) * 7 : 0,
  });
});

const MONTHES_COUNT = 12;
const monthesList = Array(MONTHES_COUNT).fill(0).map((_, rowIdx) => {
  return ({
    id: rowIdx,
    hasCompletedTasks: true,
    completedCount: Math.trunc(Math.random() * 10) * 25,
  });
});

const daysData = separateToTow(daysList);
const weeksData = separateToTow(weeksList);
const monthesData = separateToTow(monthesList);

export { daysData, weeksData, monthesData };