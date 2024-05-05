'use client'
import {setDoc, collection, doc, getDoc, addDoc} from 'firebase/firestore';
import {db} from './init';


type UserData = {
    displayName: string,
    city: string,
    district: string,
    address: string,
    phone: string,
}
/**
 * firebase 新增資料
 * @alias 文件 https://firebase.google.com/docs/firestore/manage-data/add-data?hl=zh-tw
 */
export async function addUserData ({
   displayName,
   city,
   district,
   address,
   phone,
}: UserData, uid: string) {
    await setDoc(doc(db, "users", uid), {
        displayName,
        city,
        district,
        address,
        phone,
    });
}

/**
 * firebase 取得資料
 * @alias 文件 https://firebase.google.com/docs/firestore/query-data/get-data?hl=zh-tw
 */
export async function getUserData () {
    // example
    const docRef = doc(db, "cities", "SF");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

export const crud = {
    addUserData,
    getUserData
}