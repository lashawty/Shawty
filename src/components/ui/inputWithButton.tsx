'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {ChangeEvent, useState} from 'react';
import {useRouter} from 'next/navigation';

type Props = {
    placeholder: string,
}

export function InputWithButton({
    placeholder,
}: Props) {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget;
        if(value) {
            setSearchValue(value)
        }
    }

    const handleOnSubmit = () => {
        if(searchValue) {
            router.push(`/search/${searchValue}`)
        }
    }


    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder={placeholder} onChange={handleOnChange} value={searchValue}/>
            <Button type="submit" onClick={handleOnSubmit}>Submit</Button>
        </div>
    )
}
