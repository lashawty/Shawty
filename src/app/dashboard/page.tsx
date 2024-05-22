'use client'
import {useContext} from 'react';
import {AuthContext} from '@/components/provider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthRedirect } from '@/lib/hooks';

export default function Dashboard() {
    const {displayName, phoneNumber, email, uid} = useContext(AuthContext);
    useAuthRedirect({notAuth: '/'}, !!uid);
    
    return (
        <div className="grid gap-6">
            <h2 className="text-2xl font-semibold">{`歡迎回來！ ${displayName}`}</h2>

            <Card x-chunk="dashboard-04-chunk-2">
                <CardHeader>
                    <CardTitle>商家資料</CardTitle>
                    <CardDescription>
                        您可以在這裡修改您的商家資料
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4">
                        <Input
                            placeholder="電話號碼"
                            defaultValue={phoneNumber ?? ""}
                            disabled={!!phoneNumber}
                        />
                        <Input
                            placeholder="EMail"
                            defaultValue={email ?? ""}
                            disabled={!!email}
                        />
                    </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>送出</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
