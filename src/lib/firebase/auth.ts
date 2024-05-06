'use client'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut as firebaseSignOut,
} from 'firebase/auth';
import {app} from './init';

const authed = getAuth(app);

/**
 * firebase 註冊
 * @alias 文件 https://firebase.google.com/docs/firestore/manage-data/add-data?hl=zh-tw
 */
function createUser (email: string, password: string) {
    return createUserWithEmailAndPassword(authed, email, password);
}

function signIn (email: string, password: string) {
    return signInWithEmailAndPassword(authed, email, password);
}

function updateDisplayName (displayName: string) {
    const {currentUser} = authed;
    if(!currentUser) {
        throw Error('no current user')
    }
    return updateProfile(currentUser, {
        displayName,
        // photoURL: "https://example.com/jane-q-user/profile.jpg"
    })
}
export type AuthInfo = {
    displayName: string | null,
    uid: string | null,
    email: string | null,
    photoUrl: string | null,
    phoneNumber: string | null,
}

function getAuthState (onLogin: (info: AuthInfo) => void, onLogout = () => {}) {
    onAuthStateChanged(authed, (user) => {
            if (user) {
                onLogin({
                    displayName: user.displayName,
                    uid: user.uid,
                    email: user.email,
                    photoUrl: user.photoURL,
                    phoneNumber: user.phoneNumber,
                })
                localStorage.setItem("isAuth", "true");
                return;
            }
    });

    localStorage.setItem("isAuth", "false");
    onLogout();
}

function signOut () {
    firebaseSignOut(authed);
    localStorage.setItem("isAuth", "false");
}

export const auth = {
    createUser,
    signIn,
    updateDisplayName,
    getAuthState,
    signOut,
};