import { PropTypes } from 'react';

export const personShape = PropTypes.shape({ // eslint-disable-line import/prefer-default-export
  personId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  faces: PropTypes.object,
  studentId: PropTypes.string
});

const timeShape = PropTypes.shape({
  h: PropTypes.number.isRequired,
  m: PropTypes.number.isRequired
});

export const scheduleItemShape = PropTypes.shape({
  start: timeShape,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  end: timeShape
});

export const scheduleShape = PropTypes.arrayOf(scheduleItemShape);
