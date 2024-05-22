"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {useRouter} from 'next/navigation';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {useContext} from 'react';
import {AuthContext} from '@/components/provider';

const formSchema = z.object({
    keyword: z.string().min(1, {
        message: "不可能一個字都不輸入吧",
    }),
})

export default function Home() {
    const router = useRouter();
    const handleOnClick = (url: string) => {
        router.push(url);
    }
    const authContext = useContext(AuthContext);
    const isAuth = authContext.uid !== null;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            keyword: "",
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        router.push(`/search/${values.keyword}`)
    }

    return (
        <section className="flex flex-col flex-1 items-center justify-center p-[20px]">
            <h1 className="text-center text-2xl font-bold">首頁</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="min-h-[100px]">
                    <FormField
                        control={form.control}
                        name="keyword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>馬上搜尋</FormLabel>
                                <FormControl>
                                    <Input placeholder="請輸入關鍵字" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="mt-5 mx-auto block" disabled={!form.formState.isValid} type="submit">搜尋店家</Button>
                </form>
            </Form>
        </section>
    )
}
