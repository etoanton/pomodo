import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const OuterCircle = ({ outerRadius, borderWidth }) => {
  const outerDiameter = outerRadius * 2;

  const outerCircleStyles = {
    ...styles.timerOuterCircle,
    borderWidth,
    width: outerDiameter,
    height: outerDiameter,
    borderRadius: outerRadius,
  };

  return (<View style={outerCircleStyles} />);
};

OuterCircle.propTypes = {
  outerRadius: PropTypes.number.isRequired,
  borderWidth: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  timerOuterCircle: {
    borderColor: '#DDDDDD',
  },
});

export default OuterCircle;
