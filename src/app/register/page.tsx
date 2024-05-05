'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {getCity} from '@/lib/utils';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {useRegisterForm} from '@/app/register/hooks';


export default function RegisterForm() {
    const {cities, getDistricts} = getCity();
    const {form, onSubmit, isDisabled} = useRegisterForm();

    return (
        <>
            <Card className="mx-auto max-w-sm w-full">
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
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>註冊你的商家縣市</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="請選擇縣市" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {cities.map((c, i) => <SelectItem key={i} value={c}>{c}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="district"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>註冊你的商家區域</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="請選擇區域" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {getDistricts(form.getValues("city")).map((c, i) => <SelectItem key={i} value={c.name}>{c.name}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>註冊你的商家地址</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="請輸入商家區域"
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
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>註冊你的聯絡電話</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="請輸入聯絡電話"
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
                                                type="phone"
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
                            <Button disabled={isDisabled} type="submit">立馬註冊</Button>
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
