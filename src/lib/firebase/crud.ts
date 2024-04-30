'use client'
import {setDoc, collection, Firestore, doc, getDoc} from 'firebase/firestore';

/**
 * firebase 新增資料
 * @param {Firestore} db Firestore Database
 * @alias 文件 https://firebase.google.com/docs/firestore/manage-data/add-data?hl=zh-tw
 */
export async function addData (db: Firestore) {
    const citiesRef = collection(db, "cities");
    // example
    await setDoc(doc(citiesRef, "SF"), {
        name: "San Francisco", state: "CA", country: "USA",
        capital: false, population: 860000,
        regions: ["west_coast", "norcal"] });
    await setDoc(doc(citiesRef, "LA"), {
        name: "Los Angeles", state: "CA", country: "USA",
        capital: false, population: 3900000,
        regions: ["west_coast", "socal"] });
    await setDoc(doc(citiesRef, "DC"), {
        name: "Washington, D.C.", state: null, country: "USA",
        capital: true, population: 680000,
        regions: ["east_coast"] });
    await setDoc(doc(citiesRef, "TOK"), {
        name: "Tokyo", state: null, country: "Japan",
        capital: true, population: 9000000,
        regions: ["kanto", "honshu"] });
    await setDoc(doc(citiesRef, "BJ"), {
        name: "Beijing", state: null, country: "China",
        capital: true, population: 21500000,
        regions: ["jingjinji", "hebei"] });
}

/**
 * firebase 取得資料
 * @param {Firestore} db Firestore Database
 * @alias 文件 https://firebase.google.com/docs/firestore/query-data/get-data?hl=zh-tw
 */
export async function getData (db: Firestore) {
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
    addData,
    getData
}