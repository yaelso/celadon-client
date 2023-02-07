import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

/**
 * Establishes Firebase configs and connection
 */

const prodConfig = {
    apiKey: process.env.REACT_APP_PROD_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROD_PROJECT_ID,
    storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_PROD_APP_ID
}

const devConfig = {
    apiKey: process.env.REACT_APP_DEV_API_KEY,
    authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_DEV_PROJECT_ID,
    storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_DEV_APP_ID
}

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
const app = initializeApp(config);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log(result);

            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken;

            const user = result.user;
            const name = result.user.displayName;
            const email = result.user.email;
            const profilePic = result.user.photoURL;

            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("profilePic", profilePic);
            localStorage.setItem("authToken", token);
        }).catch((e) => {
            console.log(e);

            const errorCode = e.code;
            const errorMessage = e.message;
            const email = e.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(e);
    });
};

export const signOutOfCeladon = () => {
    signOut(auth)
        .then(() => {
            // Sign out successful
        })
        .catch((e) => {
            // An error happened
            console.log(e);
        });
};
