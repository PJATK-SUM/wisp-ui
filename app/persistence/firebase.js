import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAJtrqzYshqpah-AxO02WAYGqWQTEgDmS4',
  authDomain: 'wisp-edb18.firebaseapp.com',
  databaseURL: 'https://wisp-edb18.firebaseio.com'
};

const firebaseApp = firebase.initializeApp(config);
const firebaseDb = firebaseApp.database();

export { firebaseApp, firebaseDb };
