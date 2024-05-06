"use client";
import { createContext, ReactNode, useState } from "react";
import {auth, AuthInfo} from '@/lib/firebase/auth';


type HandleUpdateAuthInfo = (info: AuthInfo) => void

const defaultInfo: AuthInfo = {
    displayName: null,
    uid: null,
    email: null,
    photoUrl: null,
    phoneNumber: null,
};


type AuthContext = {
    handleUpdateAuthInfo: HandleUpdateAuthInfo;
    handleSignOut: () => void;
} & AuthInfo;


const defaultValue: AuthContext = {
    ...defaultInfo,
    handleUpdateAuthInfo: () => {},
    handleSignOut: () => {},
};

const AuthContext = createContext(defaultValue);

type Props = {
    children: ReactNode
}

function AuthProvider({ children }: Props) {
    const [authInfo, setAuthInfo] = useState<AuthInfo>(defaultInfo);

    const handleUpdateAuthInfo = (info: AuthInfo) => {
        setAuthInfo({
            ...authInfo,
            ...info,
        })
    }

    const handleSignOut = () => {
        auth.signOut();
        handleUpdateAuthInfo(defaultInfo);
    }

    return (
        <AuthContext.Provider value={{...authInfo, handleUpdateAuthInfo, handleSignOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export {
    AuthContext,
    AuthProvider,
    defaultInfo
};