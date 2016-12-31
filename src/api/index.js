import firebase from 'firebase'
// import data from './data'

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
  //seed();
}

// function seed() {
//   const ref = firebase.database().ref(COLLECTION_NAME);
//   data.forEach(d=>ref.push(d));
// }

export function getInitialData() {
  return firebase.database().ref(COLLECTION_NAME).once('value').then(sp => sp.val())
}

export function addItem(item) {
  return firebase.database().ref(COLLECTION_NAME).push(item)
}

export function deleteItem(id) {
  return firebase.database().ref(COLLECTION_NAME).child(id).remove()
}

export function voteUp(uid) {
  return firebase.database().ref(COLLECTION_NAME)
    .child(uid)
    .transaction(item => {
      if (item) {
          item.votes++;
      }
      return item;
    });
}


export function getListOfItems(cb) {
  
  firebase.database().ref(COLLECTION_NAME)
    .orderByChild('votes')
    .on('value', sp => {
      const results = [];
      sp.forEach(v => { results.unshift({id:v.key,...v.val()}) })
      cb(results);
    })

}