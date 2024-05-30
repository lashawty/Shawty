'use client'
import {useContext} from 'react';
import {AuthContext} from '@/components/provider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthRedirect } from '@/lib/hooks';
import { cities } from '@/lib/city';

export default function Dashboard() {
    const {displayName, phoneNumber, email, uid, address, city, zip} = useContext(AuthContext);
    const data = [
        {
            value: phoneNumber,
            placeholder: "電話號碼",
        },
        {
            value: email,
            placeholder: "EMail",
        },
        {
            value: city,
            placeholder: "城市",
        },
        {
            value: cities.find(row => row.name === city)?.districts.find(row => row.zip === zip)?.name,
            placeholder: "地區",
        },
        {
            value: address,
            placeholder: "地址",
        },
    ]
    
    useAuthRedirect({notAuth: '/'}, !!uid);
    
    return (
        <div className="grid gap-6">
            <h2 className="text-2xl font-semibold">{`歡迎回來！ ${displayName}`}</h2>

            <Card x-chunk="dashboard-04-chunk-2">
                <CardHeader>
                    <CardTitle>商家資料</CardTitle>
                    {/* <CardDescription>
                        您可以在這裡修改您的商家資料
                    </CardDescription> */}
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4">
                        {
                            data.map((row, i) => {
                                return (
                                    <Input
                                        key={i}
                                        placeholder={row.placeholder}
                                        defaultValue={row.value ?? ""}
                                        disabled={!!row.value}
                                    />
                                )
                            })
                        }
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
