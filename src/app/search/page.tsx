'use client'

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import { notFound } from 'next/navigation'
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {Skeleton} from '@/components/ui/skeleton';
import {Suspense, useEffect, useState} from 'react';
import { crud } from "@/lib/firebase";
import { AuthInfo } from '@/lib/firebase/auth';
import { City } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type Props = {
    searchParams: {
        keyword: string,
        city: string,
    }
}

export default function Result({
   searchParams,
}: Props) {
    const {keyword, city} = searchParams;
    const [list, setList] = useState<AuthInfo[] | undefined>(undefined);

    useEffect(() => {
        crud.getSearchData(city).then((row) => {
            let data = row.data.map(row => row.value);
            if(keyword) {
                data = data.filter(row => row.displayName?.includes(keyword))
            }
            setList(data);
        });
    }, [keyword, city])
    
    const renderCards = list && list.map((row, i) => {
        return (
            <Card key={i} className='p-5'>

                <div className="w-full">
                    <Suspense fallback={<Skeleton className="w-full"/>}>
                        <AspectRatio ratio={1}>
                            <Image src="https://picsum.photos/450" fill alt="Image" className="rounded-md object-cover" />
                        </AspectRatio>
                    </Suspense>
                </div>

                <CardHeader>
                    <CardTitle>商家姓名：{row.displayName}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>商家電話：{row.phoneNumber}</p>
                    <p>商家地址：{City.formatAddress({
                        cityCode: row.city,
                        zip: row.zip,
                        address: row.address,
                    })}</p>
                </CardContent>
                <CardFooter>
                    <Button>立即預約</Button>
                </CardFooter>
            </Card>
        )
    })

    if(list?.length === 0) {
        return <div>沒有資料哦</div>;
    }

    return (
        <div className='p-5 grid grid-cols-1 gap-5 sm:grid-cols-2'>
            {
                !list ? <Skeleton className='w-full min-h-[500px]'/>: renderCards
            }
        </div>
    );
}