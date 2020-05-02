const fs = require('fs');
const uuid = require('uuid');
const dateFns = require('date-fns');

const {
  format,
  addDays,
  addMonths,
  getDaysInMonth,
} = dateFns;

// Example of item in list:
// {
//   id: UUID,
//   dayIndex: 1...365,
//   completedTasks: [],
//   keys: [], list of the days in the following format yyyy-MM-dd,
//             e.g. 2020-01-01, 2020-01-02, 2020-01-03
// }

const args = process.argv.slice(2);
const [YEAR = 2020] = args;
const NUMBER_OF_MONTHES = 12;

const firstDayOfTheYear = new Date(YEAR, 0, 1);

const toolkit = {
  getSum: arr => arr.reduce((acc, item) => acc + item, 0),
  generateDateBasedOnNumber: num => format(addDays(firstDayOfTheYear, num), 'yyyy-MM-dd'),
};

let outputList = [];
const numberOfDaysInMonthes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

for (let idx = 0; idx < NUMBER_OF_MONTHES; idx += 1) {
  const currentMonthDate = addMonths(firstDayOfTheYear, idx);
  const daysCount = getDaysInMonth(currentMonthDate);
  numberOfDaysInMonthes[idx] = daysCount;

  const currentMonthDays = Array(daysCount).fill(0).map((_, dayIdx) => {
    const previousMonthesDays = idx === 0 ? 0 : toolkit.getSum(numberOfDaysInMonthes.slice(0, idx));
    const dayInYearIndex = previousMonthesDays + (dayIdx);

    return ({
      id: uuid.v4(),
      dayIndex: dayInYearIndex + 1,
      completedTasks: [],
      keys: [toolkit.generateDateBasedOnNumber(dayInYearIndex)],
      type: 'day',
    });
  });

  outputList = outputList.concat(currentMonthDays);

  // Separators between monthes
  if (idx + 1 < NUMBER_OF_MONTHES) {
    const monthSeparator = {
      id: uuid.v4(),
      type: 'separator',
      monthIndex: idx + 1,
    };

    outputList = outputList.concat(monthSeparator);
  }
}

if (!fs.existsSync(`./helpers/${YEAR}`)) {
  fs.mkdirSync(`./helpers/${YEAR}`);
}

fs.writeFile(`./helpers/${YEAR}/days.json`, JSON.stringify(outputList, null, 2), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
