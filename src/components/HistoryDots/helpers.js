import { Dimensions } from 'react-native';
import {
  startOfYear,
  differenceInDays,
  format,
  parseISO,
} from 'date-fns';

import {
  ROW_ELEMENT_COUNT,
  DOT_SIZE,
  SCREEN_HORIZONTAL_PADDING,
  FRAME_OVERFLOW,
} from './config';

const { width: screenWidth } = Dimensions.get('window');

const groupByDate = rows => rows.reduce((acc, item) => {
  const date = format(parseISO(item.startedAt), 'yyyy-MM-dd');
  if (!acc[date]) acc[date] = [];
  acc[date].push(item);
  return acc;
}, {});

export const mergeLists = (rawList, list) => {
  if (list.length === 0) return rawList;
  const dateMap = groupByDate(list);

  return rawList.map(row => {
    const { data, ...rest } = row;
    return {
      ...rest,
      data: data.map(item => {
        const completedTasks = [];
        item.keys.forEach(key => {
          if (dateMap[key]) {
            completedTasks.push(...dateMap[key]);
          }
        });

        return ({
          ...item,
          completedTasks,
        });
      }),
    };
  });
};

export const calculateFrameSizes = () => {
  const contentWidth = screenWidth - SCREEN_HORIZONTAL_PADDING * 2;
  const offsetBetweenDots = (contentWidth - DOT_SIZE * ROW_ELEMENT_COUNT) / (ROW_ELEMENT_COUNT - 1);
  const startFrom = SCREEN_HORIZONTAL_PADDING - FRAME_OVERFLOW;
  const singleFrameWidth = DOT_SIZE + FRAME_OVERFLOW * 2;
  const spaceBetweenFrames = (
    offsetBetweenDots - FRAME_OVERFLOW * 2 + FRAME_OVERFLOW / (ROW_ELEMENT_COUNT - 1)
  );

  return {
    offsetBetweenDots,
    startFrom,
    singleFrameWidth,
    spaceBetweenFrames,
  };
};

export const calculateFramePositions = data => {
  let frames = [];
  if (data && data.some(({ completedTasks }) => completedTasks.length > 0)) {
    frames = data.reduce((acc, item, idx) => {
      if (item.completedTasks.length) {
        if (!acc.length || acc[acc.length - 1].to !== (idx - 1)) {
          acc.push({ from: idx, to: idx });
        } else {
          acc[acc.length - 1].to = idx;
        }
      }
      return acc;
    }, []);
  }
  return frames;
};

export const separateToRows = data => {
  const separatedData = [];
  for (let idx = 0; idx < data.length; idx += ROW_ELEMENT_COUNT) {
    separatedData.push({ id: idx, data: data.slice(idx, idx + ROW_ELEMENT_COUNT) });
  }
  return separatedData;
};

export const getCurrentDayIndex = () => {
  const now = new Date();
  const startOfCurrentYear = startOfYear(now);
  const currentDayIndex = differenceInDays(now, startOfCurrentYear) + 1;
  const currentDayRowIndex = Math.trunc(currentDayIndex / ROW_ELEMENT_COUNT);

  return { currentDayIndex, currentDayRowIndex };
};
