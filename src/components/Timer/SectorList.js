import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import PropTypes from 'prop-types';

const BACKGROUND_COLOR = 'rgba(0, 0, 0, 0.1)';

const SectorList = ({ radius }) => {
  const diameter = radius * 2;

  return (
    <View style={styles.container}>
      <Svg height={diameter} width={diameter}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius}
          fill={BACKGROUND_COLOR}
          strokeDasharray={[1.1, 100]}
          strokeDashoffset={-98.9}
        />
      </Svg>
    </View>
  );
};

SectorList.propTypes = {
  radius: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -2,
  },
});

export default SectorList;
