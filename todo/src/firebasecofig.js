import * as firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyAv7-dOVNxZpaw4idly24lysg2DulzvZeU",
    authDomain: "todowithblueprintui.firebaseapp.com",
    databaseURL: "https://todowithblueprintui.firebaseio.com",
    projectId: "todowithblueprintui",
    storageBucket: "",
    messagingSenderId: "143336380916",
    appId: "1:143336380916:web:3779d76d14d4376a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export const db = firebase.database()