import firebase from 'firebase';
import config from '../firebase-config.js';

const firebaseApp = firebase.initializeApp(config);
const firebaseDb = firebaseApp.database();

export { firebaseApp, firebaseDb };
