'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {getCity} from '@/lib/utils';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {useRegisterForm, type Name, type FormField} from '@/app/register/hooks';
import { HTMLInputTypeAttribute } from "react"
import { ControllerRenderProps } from "react-hook-form"

type Option = {
    value: string,
    label: string,
}


type Field = {
    name: Name,
    label: string,
    placeholder: string,
    type?: HTMLInputTypeAttribute,
    options?: Option[],
}


export default function RegisterForm() {
    const {cities, getDistricts} = getCity();
    const {form, onSubmit, isDisabled} = useRegisterForm();
    const cityOptions: Option[] = cities.map((city) => {
        return {
            value: city,
            label: city,
        }}
    );
    const districtOptions: Option[] = getDistricts(form.getValues("city")).map((dist) => {
        return {
            value: dist.zip,
            label: dist.name,
        }
    })
    const fields: Field[] = [
        {
            name: 'displayName',
            label: '商家名字',
            placeholder: '請輸入商家名字',
            type: 'text',
        },
        {
            name: 'city',
            label: '商家縣市',
            placeholder: '請選擇縣市',
            type: 'select',
            options: cityOptions,
        },
        {
            name: 'district',
            label: '商家行政區',
            placeholder: '請選擇行政區',
            type: 'select',
            options: districtOptions,
        },
        {
            name: 'address',
            label: '商家地址',
            placeholder: '請輸入商家地址',
            type: 'text',
        },
        {
            name: 'phone',
            label: '連絡電話',
            placeholder: '請輸入連絡電話',
            type: 'phone',
        },
        {
            name: 'email',
            label: '註冊帳號',
            placeholder: '請輸入電子信箱',
            type: 'email',
        },
        {
            name: 'password',
            label: '趕快想一組神秘的密碼',
            placeholder: '請輸入密碼',
            type: 'password',
        },
    ];

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
                            {
                                fields.map((row, index) => {
                                    const renderSelect = (field: FormField) => {
                                        return (
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={row.placeholder} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {row.options && row.options.map((opt, i) => <SelectItem key={i} value={opt.value}>{opt.label}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        )
                                    };

                                    const renderInput = (field: FormField) => {
                                        return (
                                            <Input
                                                placeholder={row.placeholder}
                                                type={row.type}
                                                {...field}
                                            />
                                        )
                                    }

                                    const isSelect = row.type === 'select';

                                    return (
                                        <FormField
                                            key={index}
                                            control={form.control}
                                            name={row.name}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{row.label}</FormLabel>
                                                    <FormControl>
                                                        {isSelect ? renderSelect(field) : renderInput(field)}
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )
                                })
                            }
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
