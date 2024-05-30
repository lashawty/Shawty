'use client'
import {AlertContext, AuthContext} from '@/components/provider';
import {Dialog} from '@/components/ui/alert-dialog';
import {useContext, useEffect} from 'react';
import {auth} from '@/lib/firebase';

export default function RootTemplate({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const alertContext = useContext(AlertContext);
    const {handleUpdateAuthInfo} = useContext(AuthContext);
    const handleOnContinue = () => {
        alertContext.handleOpenDialog(false)
    }
    
    useEffect(() => {
        auth.getAuthState(handleUpdateAuthInfo);
    }, [])

    return (
        <>
            {children}
            <Dialog
                title={alertContext.title}
                desc={alertContext.desc}
                continueButton="好"
                isOpen={alertContext.isOpen}
                handleOnContinue={handleOnContinue}
            />
        </>
    );
}