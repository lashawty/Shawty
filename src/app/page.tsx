"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {useRouter} from 'next/navigation';
import { Button } from "@/components/ui/button"
import { City } from "@/lib/utils";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"

const formSchema = z.object({
    keyword: z.string(),
    city: z.string(),
})

export default function Home() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            keyword: "",
            city: "",
        },
        
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.push(`/search?keyword=${values.keyword}&city=${values.city}`);
    }

    const isDisabled = !form.getValues("city")

    return (
        <section className="flex flex-col flex-1 items-center justify-center p-[20px]">
            <Card className="mx-auto max-w-xl w-full p-10">
                <CardHeader>
                    <CardTitle className="text-2xl">首頁</CardTitle>
                    <CardDescription>
                        馬上找到你適合的商家！
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="min-h-[100px] flex flex-col justify-between items-center gap-5">
                            {/* 城市 */}
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>請選擇城市</FormLabel>
                                        <FormControl>
                                            <Select 
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                disabled={field.disabled}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={"請選擇城市"} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {City.cityOptions.map((opt, i) => <SelectItem key={i} value={opt.value}>{opt.label}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* 店家姓名 */}
                            <FormField
                                control={form.control}
                                name="keyword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>馬上搜尋店家</FormLabel>
                                        <FormControl>
                                            <Input placeholder="請輸入關鍵字" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            

                            <Button className="mt-5 mx-auto block" disabled={isDisabled} type="submit">搜尋店家</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </section>
    )
}
