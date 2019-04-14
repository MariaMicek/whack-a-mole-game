import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAGs1hiYww_fpNNb8a6W3Wo4ugMBP6nFIY",
    authDomain: "whack-a-mole-game.firebaseapp.com",
    databaseURL: "https://whack-a-mole-game.firebaseio.com",
    projectId: "whack-a-mole-game",
    storageBucket: "whack-a-mole-game.appspot.com",
    messagingSenderId: "606321876192"
}

firebase.initializeApp(config)

export const database = firebase.database()
export const auth = firebase.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider()