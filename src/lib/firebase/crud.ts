'use client'
import {setDoc, collection, doc, getDoc, addDoc, query, where, getDocs} from 'firebase/firestore';
import {db} from './init';
import { AuthInfo } from './auth';


type UserData = {
    displayName: string,
    city: string,
    zip: string,
    address: string,
    phoneNumber: string,
}
/**
 * firebase 新增資料
 * @alias 文件 https://firebase.google.com/docs/firestore/manage-data/add-data?hl=zh-tw
 */
export async function addUserData ({
   displayName,
   city,
   zip,
   address,
   phoneNumber,
}: UserData, uid: string) {
    await setDoc(doc(db, "users", uid), {
        displayName,
        city,
        zip,
        address,
        phoneNumber,
    });
}

/**
 * firebase 取得資料
 * @alias 文件 https://firebase.google.com/docs/firestore/query-data/get-data?hl=zh-tw
 */
export async function getUserData (data: AuthInfo, onLogin: (info: AuthInfo) => void,) {
    if(!data.uid) {
        return;
    }
    
    const docRef = doc(db, "users", data.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const docSnapData = docSnap.data();
        
        onLogin({
            ...data,
            phoneNumber: docSnapData.phone,
            zip: docSnapData.zip,
            address: docSnapData.address,
            city: docSnapData.city,
        });
    }
}

type SearchData = {
    id: string,
    value: AuthInfo
}

/**
 * firebase 簡易查詢
 * @alias 文件 https://firebase.google.com/docs/firestore/query-data/queries?hl=zh-tw&authuser=0
 */

export async function getSearchData(city: string) {
    const q = query(collection(db, "users"), where("city", "==", city))

    const data: SearchData[] = [];
    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        const d: SearchData = {
            id: doc.id,
            value: doc.data() as AuthInfo,
        }
        data.push(d);
    });

    return {
        data
    }
}

export const crud = {
    addUserData,
    getUserData,
    getSearchData,
}