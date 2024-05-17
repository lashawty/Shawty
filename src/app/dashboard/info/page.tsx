'use client'
import {useContext} from 'react';
import {AuthContext} from '@/components/provider';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

export default function Info() {
    const {displayName, phoneNumber, email} = useContext(AuthContext);

    return (
        // <div className="w-[500px]">
        //     <h1 className="text-center text-2xl font-bold">{`你好！ ${displayName}`}</h1>
        //     <h1 className="text-center text-2xl font-bold">{`你好！ ${phoneNumber}`}</h1>
        //     <h1 className="text-center text-2xl font-bold">{`你好！ ${email}`}</h1>
        // </div>
        <section className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Settings</h1>
            </div>
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            <nav
                className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
            >
                <Link href="#" className="font-semibold text-primary">
                General
                </Link>
                <Link href="#">Security</Link>
                <Link href="#">Integrations</Link>
                <Link href="#">Support</Link>
                <Link href="#">Organizations</Link>
                <Link href="#">Advanced</Link>
            </nav>
            <div className="grid gap-6">
                <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                    <CardTitle>Store Name</CardTitle>
                    <CardDescription>
                    Used to identify your store in the marketplace.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                    <Input placeholder="Store Name" />
                    </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                </CardFooter>
                </Card>
                <Card x-chunk="dashboard-04-chunk-2">
                <CardHeader>
                    <CardTitle>Plugins Directory</CardTitle>
                    <CardDescription>
                    The directory within your project, in which your plugins are
                    located.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4">
                    <Input
                        placeholder="Project Name"
                        defaultValue="/content/plugins"
                    />
                    <div className="flex items-center space-x-2">
                        <Checkbox id="include" defaultChecked />
                        <label
                        htmlFor="include"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                        Allow administrators to change the directory.
                        </label>
                    </div>
                    </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                </CardFooter>
                </Card>
            </div>
            </div>
        </section>
    )
}
