import React, { PropTypes } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { personShape } from '../../utils/propTypes';

import Core from './Core';

import styles from './Wisp.css';

function personFirstName(person) {
  const names = person.name.split(' ');
  return names[0];
}

export default function Wisp(props) {
  const { identifying, person } = props;

  return (
    <div className={styles.self}>
      <Core curious={identifying} identified={!!person} />
      <CSSTransitionGroup
        transitionName={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          leave: styles.leave,
          leaveActive: styles.leaveActive,
          appear: styles.appear,
          appearActive: styles.appearActive
        }}
        transitionAppear
        transitionEnter
        transitionLeave
        transitionAppearTimeout={300}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        className={styles.greeting}
      >
        {person && <h2 key="0">{`Cześć ${personFirstName(person)}, jak mija dzień?`}</h2>}
        {!person && <h2 key="1">Hej, jest tam kto?</h2>}
      </CSSTransitionGroup>
    </div>
  );
}

Wisp.propTypes = {
  identifying: PropTypes.bool,
  person: personShape
};

Wisp.defaultProps = {
  identifying: false,
  person: null
};
