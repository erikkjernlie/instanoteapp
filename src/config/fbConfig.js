import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var config = {
    apiKey: "AIzaSyBDHTAwnUfZap0iikwkJLlytQX5MfOF_CI",
    authDomain: "instanoteapp.firebaseapp.com",
    databaseURL: "https://instanoteapp.firebaseio.com",
    projectId: "instanoteapp",
    storageBucket: "instanoteapp.appspot.com",
    messagingSenderId: "332731368647"
  };
firebase.initializeApp(config)
//firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase;