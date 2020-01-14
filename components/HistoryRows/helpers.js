import { Dimensions } from 'react-native';
import { ROW_ELEMENT_COUNT, DOT_SIZE, SCREEN_HORIZONTAL_PADDING, FRAME_OVERFLOW } from './config';

const { width: screenWidth } = Dimensions.get('window');

export const calculateFrameSizes = () => {
  const contentWidth = screenWidth - SCREEN_HORIZONTAL_PADDING * 2;
  const offsetBetweenDots = (contentWidth - DOT_SIZE * ROW_ELEMENT_COUNT) / (ROW_ELEMENT_COUNT - 1);
  const startFrom = SCREEN_HORIZONTAL_PADDING - FRAME_OVERFLOW;
  const singleFrameWidth = DOT_SIZE + FRAME_OVERFLOW * 2;
  const spaceBetweenFrames = offsetBetweenDots - FRAME_OVERFLOW * 2 + FRAME_OVERFLOW / (ROW_ELEMENT_COUNT - 1);

  return { offsetBetweenDots, startFrom, singleFrameWidth, spaceBetweenFrames };
};

export const calculateFramePositions = data => {
  let frames = [];
  if (data?.some(({ hasCompletedTasks }) => hasCompletedTasks)) {
    frames = data.reduce((acc, item, idx) => {
      if (item.hasCompletedTasks) {
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
}