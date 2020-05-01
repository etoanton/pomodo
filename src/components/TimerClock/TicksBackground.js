import React from 'react';
import { View, StyleSheet } from 'react-native';
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

// TODO: stroke-dasharray: 2.5
// https://css-tricks.com/almanac/properties/s/stroke-dasharray/

const TicksBackground = ({ radius, tickSize, numberOfTicks }) => {
  const ticks = Array(numberOfTicks).fill(0);
  return (
    <View style={styles.ticksBackgroundContainer}>
      <View style={{ width: radius * 2, height: radius * 2 }}>
        {ticks.map((_, idx) => (
          <View
            // eslint-disable-next-line react/no-array-index-key
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
    </View>
  );
};

const styles = StyleSheet.create({
  ticksBackgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
});

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
