import { firebaseDb } from './firebase';

export function findPersonById(personId) { // eslint-disable-line import/prefer-default-export
  return firebaseDb.ref('people')
    .orderByChild('personId')
    .equalTo(personId)
    .once('value');
}
