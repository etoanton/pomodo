const fs = require('fs');
const uuid = require('uuid');
const dateFns = require('date-fns');

const {
  format,
  addDays,
  addWeeks,
  startOfWeek,
  endOfWeek,
  differenceInDays,
  differenceInWeeks,
} = dateFns;

const args = process.argv.slice(2);
const [YEAR = '2020', WEEK_STARTS_ON = '0'] = args;

console.log(`Will generate dates for ${YEAR} (weeks starts on ${WEEK_STARTS_ON === '0' ? 'SUN' : 'MON'})`);

const firstDayOfTheYear = new Date(YEAR, 0, 1);
const lastDayOfTheYear = new Date(YEAR, 11, 31);
const endOfTheFirstWeekOfTheYear = endOfWeek(firstDayOfTheYear, { weekStartsOn: WEEK_STARTS_ON });

const NUMBER_OF_WEEKS = differenceInWeeks(lastDayOfTheYear, firstDayOfTheYear);

const toolkit = {
  getSum: arr => arr.reduce((acc, item) => acc + item, 0),
  generateDateBasedOnNumber: num => format(addDays(firstDayOfTheYear, num), 'yyyy-MM-dd'),
};

const outputList = [];

const firstWeekDaysCount = differenceInDays(endOfTheFirstWeekOfTheYear, firstDayOfTheYear);
const startOfTheLastWeekOfTheYear = startOfWeek(lastDayOfTheYear, { weekStartsOn: WEEK_STARTS_ON });
const lastWeekDaysCount = differenceInDays(lastDayOfTheYear, startOfTheLastWeekOfTheYear);

for (let idx = 0; idx <= NUMBER_OF_WEEKS; idx += 1) {
  const startOfCurrentWeek = addWeeks(endOfTheFirstWeekOfTheYear, idx);
  const currentWeekIndex = differenceInWeeks(startOfCurrentWeek, firstDayOfTheYear);

  // eslint-disable-next-line no-nested-ternary
  const daysInWeekCount = idx === 0 ? (firstWeekDaysCount + 1)
    : idx === NUMBER_OF_WEEKS ? (lastWeekDaysCount + 1) : 7;

  const prependDaysCount = idx === 0 ? 0 : firstWeekDaysCount + 1;
  const previousWeekDays = idx === 0 ? 0 : (currentWeekIndex - 1) * 7;

  const currentWeekDays = Array(daysInWeekCount)
    .fill(0)
    .map((_, dayIdx) => {
      const dayIndex = prependDaysCount + previousWeekDays + dayIdx;
      return toolkit.generateDateBasedOnNumber(dayIndex);
    });

  outputList.push({
    id: uuid.v4(),
    weekIndex: idx,
    completedTasks: [],
    keys: currentWeekDays,
  });
}

// console.log(outputList);

if (!fs.existsSync(`./helpers/${YEAR}`)) {
  fs.mkdirSync(`./helpers/${YEAR}`);
}

fs.writeFile(`./helpers/${YEAR}/weeks-${WEEK_STARTS_ON}.json`, JSON.stringify(outputList, null, 2), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
