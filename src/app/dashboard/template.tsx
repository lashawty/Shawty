'use client'
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function DashboardTemplate({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isAuth = localStorage.getItem("isAuth") === "true";
    const router = useRouter();
    if(!isAuth) {
        router.push('/');
    }

    return (
        <>
            {children}
        </>
    );
}