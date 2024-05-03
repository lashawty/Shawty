'use client'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from 'firebase/auth';
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

export const auth = {
    createUser,
    signIn,
    updateDisplayName,
};