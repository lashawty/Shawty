'use client'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {FirebaseApp} from '@firebase/app';

/**
 * firebase 註冊
 * @alias 文件 https://firebase.google.com/docs/firestore/manage-data/add-data?hl=zh-tw
 */
function createUser (app: FirebaseApp, email: string, password: string) {

    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log(user);
            console.log(userCredential);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
        });
}

export const auth = {
    createUser,
};