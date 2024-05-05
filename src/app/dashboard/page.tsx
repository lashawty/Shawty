'use client'
import {useContext} from 'react';
import {AuthContext} from '@/components/provider';

export default function Dashboard() {
    const {displayName} = useContext(AuthContext);
    return (
        <div className="w-[500px]">
            <h1 className="text-center text-2xl font-bold">{`你好！ ${displayName}`}</h1>
        </div>
    )
}
