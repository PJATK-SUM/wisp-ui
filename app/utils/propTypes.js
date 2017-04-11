import { PropTypes } from 'react';

export const personShape = PropTypes.shape({ // eslint-disable-line import/prefer-default-export
  personId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  faces: PropTypes.object,
  studentId: PropTypes.string
});
