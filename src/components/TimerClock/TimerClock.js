import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import TicksBackground from './TicksBackground';
import OuterCircle from './OuterCircle';
import InnerCircle from './InnerCircle';
import FormattedTextInfo from './FormattedTextInfo';

const BORDER_WIDTH = 6;
const TICK_SIZE = 10;
export const MAX_TIMER_VALUE = 90;

const TimerClock = ({
  radius: outerRadius,
  timerValue,
  taskLisk,
  activeTimerItemIdx,
}) => {
  const innerCircleRadius = outerRadius - BORDER_WIDTH;
  const ticksCircleRadius = outerRadius - BORDER_WIDTH * 2 - TICK_SIZE;
  // const sectorRadius = outerRadius - BORDER_WIDTH * 2;

  return (
    <View style={styles.container}>
      <OuterCircle outerRadius={outerRadius} borderWidth={BORDER_WIDTH} />
      <InnerCircle innerRadius={innerCircleRadius} borderWidth={BORDER_WIDTH} />
      <TicksBackground radius={ticksCircleRadius} tickSize={TICK_SIZE} />
      {/* <SectorList radius={sectorRadius} borderWidth={BORDER_WIDTH} /> */}

      {/* Focus / 15:00 / .... */}
      <FormattedTextInfo
        timerValue={timerValue}
        taskLisk={taskLisk}
        activeTimerItemIdx={activeTimerItemIdx}
      />
    </View>
  );
};

TimerClock.defaultProps = {
  radius: 100,
};

TimerClock.propTypes = {
  radius: PropTypes.number,
  timerValue: PropTypes.number.isRequired,
  taskLisk: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      startedAt: PropTypes.string.isRequired,
      finishedAt: PropTypes.string.isRequired,
      timeCompleted: PropTypes.number.isRequired,
      timeTotal: PropTypes.number.isRequired,

    }),
  ).isRequired,
  activeTimerItemIdx: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {},
});

export default TimerClock;
