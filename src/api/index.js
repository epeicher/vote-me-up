import firebase from 'firebase'
//  import data from './data'

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
  // seed();
}

// function seed() {
//   const ref = firebase.database().ref(COLLECTION_NAME);
//   data.forEach(d=>ref.push(d));
// }

export function registerUserListener(cb) {
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    cb(user)
  } else {
    // No user is signed in.
    cb()
  }
});
}

export function authenticateWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    //var token = result.credential.accessToken;

    // The signed-in user info.
    //var user = result.user;
    // ...
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    console.error(errorCode, errorMessage, email, credential)

  });
}

export function signOut() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }, function(error) {
    // An error happened.
    console.error(error);
  });
}

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
      const user = firebase.auth().currentUser;
      if (item && user) {
        item.votes = (item.votes || []).concat(user.uid);
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