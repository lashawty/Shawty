'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useContext, useState} from 'react';
import {auth} from '@/lib/firebase';
import {AlertContext} from '@/components/provider/alert-provider';
import {errorCodeConfig, ErrorCodeEnum} from '@/lib/firebase/config';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';

const formSchema = z.object({
    displayName: z.string().min(2, {
        message: '店家名字至少需要兩個字吧！',
    }),
    email: z.string().email("請輸入 Email"),
    password: z.string().min(1, {
        message: "忘記打密碼了啦！",
    }),
})

export default function RegisterForm() {
    const {handleUpdateMessage} = useContext(AlertContext);
    const [isPending, setIsPending] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            displayName: "",
            email: "",
            password: "",
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsPending(true);
        const createUserPromise = auth.createUser(values.email, values.password);
        createUserPromise.then((userCredential) => {
            auth.updateDisplayName(values.displayName)
                .then(() => {
                    console.log('Profile updated!');
                })
                .catch((error) => {
                    handleUpdateMessage({
                        title: error.code,
                        desc: error.message,
                    })
                })
            handleUpdateMessage({
                title: "註冊成功",
                desc: `${userCredential.user.email} 已註冊成功！`,
            })
        })
            .catch((error) => {
                handleUpdateMessage({
                    title: "註冊失敗",
                    desc: errorCodeConfig[error.code as ErrorCodeEnum] ?? error.code,
                })
            })
            .finally(() => {
                setIsPending(false);
            })
    }
    return (
        <>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">註冊</CardTitle>
                    <CardDescription>
                        事不宜遲，馬上加入吧！
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between items-center gap-5">
                            <FormField
                                control={form.control}
                                name="displayName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>註冊你的商家名字</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="請輸入商家名字"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>註冊你的幸運信箱</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="請輸入信箱"
                                                type="email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>趕快想一組神秘的密碼</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="請輸入密碼"
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button disabled={!form.formState.isValid || isPending} type="submit">立馬註冊</Button>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        什麼？已經有帳號了嗎？{" "}
                        <Link href="/login" className="underline">
                            立馬登入
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
