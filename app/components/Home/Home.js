// @flow
import React, { Component, PropTypes } from 'react';
import log from 'electron-log';

import { personShape } from '../../utils/propTypes';
import { firebaseDb, findPersonById } from '../../persistence';

import Heart from './Heart';
import styles from './Home.css';

function personFirstName(person) {
  const names = person.name.split(' ');
  return names[0];
}

export default class Home extends Component {
  static propTypes = {
    person: personShape,
    setPerson: PropTypes.func.isRequired
  };

  componentWillMount() {
    firebaseDb.ref('screens/proto/personId').on('value', this.personIdChanged.bind(this));
  }

  componentWillUnmount() {
    firebaseDb.ref('screens/proto/personId').off('value', this.personIdChanged.bind(this));
  }

  personIdChanged(snapshot) {
    const personId = snapshot.val();

    if (personId) {
      findPersonById(personId).then(people => {
        if (people.hasChildren()) {
          people.forEach(personSnapshot => {
            const person = personSnapshot.val();
            this.props.setPerson(person);
          });
        } else {
          this.props.setPerson(null);
        }
        return people;
      }).catch(error => {
        log.error(error);
      });
    } else {
      this.props.setPerson(null);
    }
  }

  render() {
    const { person } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.greeter}>
          <Heart />
          {person ? <h2>Hi {personFirstName(person)}!</h2> : <h2>Hello, anybody there?</h2>}
        </div>
      </div>
    );
  }
}
