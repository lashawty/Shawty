"use client";
import { createContext, ReactNode, useState } from "react";

type AuthInfo = {
    isAuth: boolean,
    displayName: string,
    token: string,
}

type HandleUpdateAuthInfo = (message: AuthInfo) => void

const defaultInfo: AuthInfo = {
    isAuth: false,
    displayName: '',
    token: '',
}


type AuthContext = {
    handleUpdateAuthInfo: HandleUpdateAuthInfo;
} & AuthInfo;


const defaultValue: AuthContext = {
    ...defaultInfo,
    handleUpdateAuthInfo: () => {},
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

    return (
        <AuthContext.Provider value={{...authInfo, handleUpdateAuthInfo}}>
            {children}
        </AuthContext.Provider>
    );
}

export {
    AuthContext,
    AuthProvider,
    defaultInfo
};