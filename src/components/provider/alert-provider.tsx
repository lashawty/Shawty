"use client";
import { createContext, ReactNode, useState } from "react";
import {type Message} from '@/components/ui/alert-dialog';

type HandleUpdateMessage = (message: Message) => void

const defaultMessage: Message = {
    title: '',
    desc: '',
}


type AlertContext = {
    handleUpdateMessage: HandleUpdateMessage;
    isOpen: boolean;
    handleOpenDialog: (isOpen: boolean) => void
} & Message;


const defaultValue: AlertContext = {
    ...defaultMessage,
    isOpen: false,
    handleUpdateMessage: () => {},
    handleOpenDialog: () => {},
};

const AlertContext = createContext(defaultValue);

type Props = {
    children: ReactNode
}

function AlertProvider({ children }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [dialogMessage, setDialogMessageMessage] = useState<Message>(defaultMessage);

    const handleUpdateMessage = (message: Message) => {
        setDialogMessageMessage({
            ...dialogMessage,
            ...message,
        })

        setIsOpen(true);
    }

    const handleOpenDialog = (isOpen: boolean) => {
        setIsOpen(isOpen);
    }


    return (
        <AlertContext.Provider value={{isOpen, ...dialogMessage, handleUpdateMessage, handleOpenDialog}}>
            {children}
        </AlertContext.Provider>
    );
}

export {
    AlertContext,
    AlertProvider,
    defaultValue
};