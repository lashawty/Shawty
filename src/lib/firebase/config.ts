export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export enum ErrorCodeEnum {
    InvalidEmail = "auth/invalid-email",
    WeakPassword = "auth/weak-password",
    InvalidCredential = "auth/invalid-credential",
}

export const errorCodeConfig: Record<ErrorCodeEnum, string> = {
    [ErrorCodeEnum.InvalidEmail]: "Email 格式錯誤",
    [ErrorCodeEnum.WeakPassword]: "你的密碼太弱了吧",
    [ErrorCodeEnum.InvalidCredential]: "帳號密碼輸入錯誤",
}



