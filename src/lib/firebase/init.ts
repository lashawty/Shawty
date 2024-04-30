'use client'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore/lite';
import {firebaseConfig} from '@/lib/firebase/config';

/**
 * firebase 啟動
 */
export function initFirebase() {
    console.log('init firebase');
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getFirestore(app);

    return {
        app,
        analytics,
        db,
    }
}