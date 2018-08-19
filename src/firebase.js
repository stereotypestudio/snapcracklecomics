import firebase from 'firebase'
require('firebase/firestore')

var config = {
    apiKey: "AIzaSyBowD2eTw-lcIR_bjm_3fc6-Ar1MZ-CKmU",
    authDomain: "comicgenie-edf24.firebaseapp.com",
    databaseURL: "https://comicgenie-edf24.firebaseio.com",
    projectId: "comicgenie-edf24",
    storageBucket: "comicgenie-edf24.appspot.com",
    messagingSenderId: "922238348004"
  };
  firebase.initializeApp(config);

export default firebase;