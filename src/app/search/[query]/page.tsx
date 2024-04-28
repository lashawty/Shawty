import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import { notFound } from 'next/navigation'
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {Skeleton} from '@/components/ui/skeleton';
import {Suspense} from 'react';

const mockData = [
    {
        id: 1,
        title: 'title',
        desc: 'desc',
        content: 'content',
        footer: 'footer',
        category: 'testId',
    },
    {
        id: 2,
        title: 'title',
        desc: 'desc',
        content: 'content',
        footer: 'footer',
        category: 'testId',
    },
    {
        id: 3,
        title: 'title',
        desc: 'desc',
        content: 'content',
        footer: 'footer',
        category: 'testId2',
    },
]

type Props = {
    params: {
        query: string,
    }
}

export default function Result({
   params
}: Props) {
    const {query} = params;
    const getResult = mockData.filter(row => row.category === query);
    if(getResult.length === 0) {
        return notFound();
    }

    return (
        <div className='p-5 grid grid-cols-1 gap-5 sm:grid-cols-2'>
            {
                getResult.map((row) => (
                    <Card key={row.id} className='p-5'>

                        <div className="w-full">
                            <Suspense fallback={<Skeleton className="w-full"/>}>
                                <AspectRatio ratio={1}>
                                    <Image src="https://picsum.photos/450" fill alt="Image" className="rounded-md object-cover" />
                                </AspectRatio>
                            </Suspense>
                        </div>

                        <CardHeader>
                            <CardTitle>{row.title}</CardTitle>
                            <CardDescription>{row.desc}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>{row.content}</p>
                        </CardContent>
                        <CardFooter>
                            <p>{row.footer}</p>
                        </CardFooter>
                    </Card>
                ))
            }
        </div>
    );
}