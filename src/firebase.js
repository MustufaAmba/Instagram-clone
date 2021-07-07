import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBeuZhwbG6zyt02ZqAS3sEeJDqLsgP1PXE",
    authDomain: "instagram-clone-3f365.firebaseapp.com",
    databaseURL: "https://instagram-clone-3f365-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-3f365",
    storageBucket: "instagram-clone-3f365.appspot.com",
    messagingSenderId: "221158484823",
    appId: "1:221158484823:web:6c7d44865bfb9f04a52c12",
    measurementId: "G-VFMT0NEP1B"
  });
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  export {db, auth,storage};