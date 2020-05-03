import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import { tasksListPropType } from '../../state/Timer';
import TicksBackground from './TicksBackground';
import OuterCircle from './OuterCircle';
import InnerCircle from './InnerCircle';
import TimerInfo from './TimerInfo';
import SectorList from './SectorList';

const BORDER_WIDTH = 6;
const TICK_SIZE = 10;
export const MAX_TIMER_VALUE = 90;

const TimerClock = ({
  radius: outerRadius,
  timerValue,
  taskLisk,
  activeTimerItemIdx,
  status,
}) => {
  const innerCircleRadius = outerRadius - BORDER_WIDTH;
  const ticksCircleRadius = outerRadius - BORDER_WIDTH * 2 - TICK_SIZE;
  const sectorRadius = ticksCircleRadius;

  const [total, completed] = taskLisk.reduce((acc, item) => {
    if (item.finisedAt) {
      acc[0] += item.timeCompleted;
      acc[1] += item.timeCompleted;
    } else {
      acc[0] += item.timeTotal;
      acc[1] += item.timeCompleted;
    }
    return acc;
  }, [0, 0]);

  const percentage = completed / total;

  return (
    <View style={styles.container}>
      <OuterCircle outerRadius={outerRadius} borderWidth={BORDER_WIDTH} />
      <InnerCircle innerRadius={innerCircleRadius} borderWidth={BORDER_WIDTH} />
      <TicksBackground radius={ticksCircleRadius} tickSize={TICK_SIZE} />
      <SectorList
        status={status}
        radius={sectorRadius}
        completed={percentage}
        borderWidth={BORDER_WIDTH}
      />

      {/* Focus / 15:00 / .... */}
      <TimerInfo
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
  taskLisk: tasksListPropType.isRequired,
  activeTimerItemIdx: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {},
});

export default TimerClock;
