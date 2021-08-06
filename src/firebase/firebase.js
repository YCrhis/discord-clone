import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBZlB6XRD0i-HT54xRFR6_D36RUsaEoVjY",
    authDomain: "discord-clone-53c06.firebaseapp.com",
    projectId: "discord-clone-53c06",
    storageBucket: "discord-clone-53c06.appspot.com",
    messagingSenderId: "424934817329",
    appId: "1:424934817329:web:b6a4eb056ca0b7ebb75f10"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider  = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;