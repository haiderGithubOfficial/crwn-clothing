import { takeLatest, all, call, put } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "./user.types";
import { signInSuccess, signInFailed, signUpSuccess, signUpFailed, signOutSuccess, signOutFailed } from "./user.action";
import {
    createUserDocumentFromAuth,
    getCurrentUser,
    userSignOut,
    signInWithGogglePopup,
    signInAutWithEmailAndPassword,
    createAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";





export function* getSnapshotFromUserAuth(userAuth, additionalInformation) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalInformation);
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield put(signInFailed(error));
    }
}


export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
    yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* emailSignUp({ payload: { displayName, email, password } }) {
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password)
        yield put(signUpSuccess(user, { displayName }));
    } catch (error) {
        yield put(signUpFailed(error));
    }
}

export function* googleSignIn() {
    try {
        const { user } = yield call(signInWithGogglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}


export function* emailSignIn({ payload: { email, password } }) {
    try {
        const { user } = yield call(signInAutWithEmailAndPassword, email, password);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }

}

export function* signOut() {
    try {
        yield call(userSignOut);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error));
    }

}





export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onEmailSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, emailSignUp)
}

export function* onEmailSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, googleSignIn)
}

export function* onEmailSignIn() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* onUserSignOut() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}



export function* userSagas() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignIn),
        call(onEmailSignUpStart),
        call(onEmailSignUpSuccess),
        call(onUserSignOut)
    ]);
}