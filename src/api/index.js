import firebase from 'firebase'

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
//   const data = require('./data').default
//   const ref = firebase.database().ref(COLLECTION_NAME);
//   ref.remove().then(() =>data.forEach(d=>ref.push(d)));
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

export function updateItem(id, itemValue) {
  return firebase.database().ref(COLLECTION_NAME)
    .child(id)
    .update({name:itemValue})
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
        if(item.votedBy && item.votedBy[user.uid]) {
          item.votes--;
          item.votedBy[user.uid] = null;
        } else {
          item.votes++;
          if(!item.votedBy) {
            item.votedBy = {}
          }
          item.votedBy[user.uid] = true;
        }
      }
      return item;
    });
}


export function getListOfItems(cb) {
  const ref = firebase.database().ref(COLLECTION_NAME)

  ref.orderByChild('votes')
    .on('value', sp => {
      const viewed = []
      const nonViewed = []
      
      const setTitleAndLink = (item) => {
        const separator = ' - ';
        const separatorIndex = item.name.indexOf(separator);

        if (separatorIndex !== -1) {
          const split = item.name.split(separator);
          item.title = split[1];
          item.link = split[0];
        } else {
          item.title = item.name;
          item.link = item.name;
        }
      }
      
      sp.forEach(v => { 
        const item = {id:v.key, ...v.val()}
        setTitleAndLink(item);

        if(v.val().viewed) {
          viewed.push(item);
        } else {
          nonViewed.push(item);
        }
       })
       let orderedResult = [...nonViewed.reverse(), ...viewed.reverse()]
       cb(orderedResult)
    })
}

export function viewed(id, viewed) {
  return firebase.database().ref(COLLECTION_NAME)
    .child(id)
    .update({viewed})
}