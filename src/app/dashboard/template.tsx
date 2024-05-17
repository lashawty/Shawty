'use client'
import {useAuthRedirect} from '@/lib/hooks';

export default function DashboardTemplate({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    useAuthRedirect({notAuth: '/login'});
    
    return (
        <>
            {children}
        </>
    );
}