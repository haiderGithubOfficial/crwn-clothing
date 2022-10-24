import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDdjS2KD6ygBI2qtaDY3v00dxYq-ToMLPg",
    authDomain: "crwn-clothing-db-6fe29.firebaseapp.com",
    projectId: "crwn-clothing-db-6fe29",
    storageBucket: "crwn-clothing-db-6fe29.appspot.com",
    messagingSenderId: "1068529018260",
    appId: "1:1068529018260:web:e88f15aa2a200c807d1b81"
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGogglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

const db = getFirestore();
console.log('database,', db);
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log('userDocRef', userDocRef);
    const userSnapShot = await getDoc(userDocRef)
    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdDate = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdDate
            })
        } catch (error) {
            console.log(error);
        }
    }
} 