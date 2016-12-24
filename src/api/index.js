import firebase from 'firebase'
//import data from './data'

const COLLECTION_NAME = 'lunch-learn'

// Initialize Firebase
export function initStorage() {
  var config = {
    apiKey: "AIzaSyDK4htKm7aOcpVTUZUqbMneledQIjZBfzY",
    authDomain: "vote-me-up.firebaseapp.com",
    databaseURL: "https://vote-me-up.firebaseio.com",
    storageBucket: "vote-me-up.appspot.com",
    messagingSenderId: "800375570860"
  };
  firebase.initializeApp(config);
  seed();
}

function seed() {
  //firebase.database().ref(COLLECTION_NAME).set(data);
}

export function getInitialData() {
  return firebase.database().ref(COLLECTION_NAME).once('value').then(sp => sp.val())
}

export function attachChange(cb) {
  return firebase.database().ref(COLLECTION_NAME).on('value', sp => cb(sp.val()))
}