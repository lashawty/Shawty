'use client'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
import {firebaseConfig} from '@/lib/firebase/config';


/**
 * firebase 啟動
 */
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const db = getFirestore(app);