import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
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
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGogglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    })

    await batch.commit();
}

export const getCategoriesAndDocuments = async (categories) => {
    const collectionRef = collection(db, categories);
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

}



getCategoriesAndDocuments();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapShot = await getDoc(userDocRef)
    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdDate = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdDate,
                ...additionalInformation
            })
        } catch (error) {
            console.log(error);
        }
    }
    return userSnapShot;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        return response;
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            alert("User Already Registered Please Try another email.");
            return;
        }
    }

}

export const signInAutWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const userSignOut = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        )
    })
}