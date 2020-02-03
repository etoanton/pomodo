import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const calculateTickStyle = ({
  idx: tickIdx,
  radius,
  numberOfTicks,
  tickSize,
}) => {
  const angleStep = 360 / numberOfTicks;
  const angleDeg = angleStep * tickIdx;
  const angleRad = (angleStep * tickIdx * Math.PI) / 180;

  const right = radius * Math.cos(angleRad);
  const top = radius * Math.sin(angleRad);

  return ({
    top: top + radius - 4,
    right: right + radius,
    position: 'absolute',
    height: tickSize,
    width: 1,
    backgroundColor: '#525269',
    transform: [{
      rotate: `${-(90 + angleDeg)}deg`,
    }],
  });
};

const TicksBackground = ({ radius, tickSize, numberOfTicks }) => {
  const ticks = Array(numberOfTicks).fill(0);
  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      {ticks.map((_, idx) => (
        <View
          key={idx}
          style={calculateTickStyle({
            idx,
            radius,
            numberOfTicks,
            tickSize,
          })}
        />
      ))}
    </View>
  );
};

TicksBackground.defaultProps = {
  radius: 80,
  tickSize: 10,
  numberOfTicks: 60,
};

TicksBackground.propTypes = {
  radius: PropTypes.number,
  tickSize: PropTypes.number,
  numberOfTicks: PropTypes.number,
};

export default TicksBackground;
