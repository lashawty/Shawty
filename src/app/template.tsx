'use client'
import {AlertContext} from '@/components/provider';
import {Dialog} from '@/components/ui/alert-dialog';
import {useContext} from 'react';

export default function RootTemplate({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const alertContext = useContext(AlertContext);
    const handleOnContinue = () => {
        alertContext.handleOpenDialog(false)
    }

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