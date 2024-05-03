'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
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
import {useContext, useState} from 'react';
import {auth} from '@/lib/firebase';
import {AlertContext} from '@/components/provider/alert-provider';
import {errorCodeConfig, ErrorCodeEnum} from '@/lib/firebase/config';
import {Label} from '@/components/ui/label';

const formSchema = z.object({
    email: z.string().email("請輸入 Email"),
    password: z.string().min(1, {
        message: "忘記打密碼了啦！",
    }),
})

export default function LoginForm() {
    const [isPending, setIsPending] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsPending(true);
        const signInPromise = auth.signIn(values.email, values.password);
        signInPromise
            .then((userCredential) => {
                console.log(userCredential);
                handleUpdateMessage({
                    title: "登入成功",
                    desc: "你已登入成功！",
                })
            })
            .catch((error) => {
                handleUpdateMessage({
                    title: "登入失敗",
                    desc: errorCodeConfig[error.code as ErrorCodeEnum] ?? error.code,
                })
            })
            .finally(() => {
                setIsPending(false);
            })
    }

    const {handleUpdateMessage} = useContext(AlertContext);

    const handleForgetPassword = () => {
        handleUpdateMessage({
            title: "忘記密碼",
            desc: "請聯絡 Sean 重設密碼，因為沒錢傳簡訊給你驗證",
            continueButton: "Okay",
        })
    }

    return (
        <>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">登入</CardTitle>
                    <CardDescription>
                        請輸入帳號密碼：）
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between items-center gap-5">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>登入信箱</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="請輸入登入信箱"
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
                                        <FormLabel>密碼</FormLabel>
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
                            <Label className="underline" onClick={handleForgetPassword}>忘記密碼</Label>
                            <Button disabled={!form.formState.isValid || isPending} type="submit">登入</Button>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        沒有帳號嗎？{" "}
                        <Link href="/register" className="underline">
                            立馬註冊
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
