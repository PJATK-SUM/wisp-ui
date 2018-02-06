import log from 'electron-log';
import { firebaseDb } from './firebase';

export function findPersonById(personId) { // eslint-disable-line import/prefer-default-export
  return firebaseDb.ref('people')
    .orderByChild('personId')
    .equalTo(personId)
    .once('value')
    .then(people => {
      let person = null;

      if (people.hasChildren()) {
        people.forEach(personSnapshot => {
          person = personSnapshot.val();
        });
      }

      return person;
    })
    .catch(error => log.error(error));
}
