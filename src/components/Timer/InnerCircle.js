import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const InnerCircle = ({ innerRadius, borderWidth }) => {
  const innerDiameter = innerRadius * 2;

  const innerCircleStyles = {
    ...styles.timerInnerCircle,
    width: innerDiameter,
    height: innerDiameter,
    borderRadius: innerDiameter,
    top: borderWidth,
    left: borderWidth,
    borderWidth: borderWidth + 2,
  };

  return (<View style={innerCircleStyles} />);
};

InnerCircle.propTypes = {
  innerRadius: PropTypes.number.isRequired,
  borderWidth: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  timerInnerCircle: {
    position: 'absolute',
    borderColor: '#2A2A33',
  },
});

export default InnerCircle;
