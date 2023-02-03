import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}

class Firebase {
    constructor() {
        app.initializeApp(config);
        auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) => {

    }

    doSignInWithEmailAndPassword = (email, password) => {

    }

    doSignOut = () => auth.signOut();

    doPasswordReset = email => auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => {
        auth.currentUser.updatePassword(password);
    }
}

export default Firebase;
