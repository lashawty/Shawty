'use client'
import {AuthContext} from '@/components/provider';
import {useContext} from 'react';
import {useRouter} from 'next/navigation';

export default function DashboardTemplate({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const {isAuth} = useContext(AuthContext);
    const router = useRouter();

    if(!isAuth) {
        router.push('/')
    }

    return (
        <>
            {children}
        </>
    );
}