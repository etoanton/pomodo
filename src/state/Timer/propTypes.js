/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';

const tasksListPropType = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    startedAt: PropTypes.string.isRequired,
    finishedAt: PropTypes.string.isRequired,
    timeCompleted: PropTypes.number.isRequired,
    timeTotal: PropTypes.number.isRequired,
  }),
);

export { tasksListPropType };
