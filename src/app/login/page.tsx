'use client'
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
import {Label} from '@/components/ui/label';
import { useLoginForm } from "./hooks"
import { HTMLInputTypeAttribute } from "react"
import { useAuthRedirect } from "@/lib/hooks"

type Field = {
    name: "email" | "password",
    label: string,
    placeholder: string,
    type?: HTMLInputTypeAttribute,
}

const fields: Field[] = [
    {
        name: 'email',
        label: '登入信箱',
        placeholder: '請輸入登入信箱',
        type: 'email',
    },
    {
        name: 'password',
        label: '密碼',
        placeholder: '請輸入密碼',
        type: 'password',
    },
];

export default function LoginForm() {
    useAuthRedirect({auth: '/'});
    const {form, handleForgetPassword, onSubmit, isDisabled} = useLoginForm();
    
    return (
        <section className="flex h-screen items-center justify-center p-[20px]">
            <Card className="mx-auto max-w-xl w-full">
                <CardHeader>
                    <CardTitle className="text-2xl">登入</CardTitle>
                    <CardDescription>
                        請輸入帳號密碼：）
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between items-center gap-5">
                            {fields.map((row, index) => {
                                return (
                                    <FormField
                                        key={index}
                                        control={form.control}
                                        name={row.name}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{row.label}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={row.placeholder}
                                                        type={row.type}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )
                            })}
                            <Label className="underline" onClick={handleForgetPassword}>忘記密碼</Label>
                            <Button disabled={isDisabled} type="submit">登入</Button>
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
        </section>
    )
}
