import Link from 'next/link';

export default function DashboardTemplate({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <section className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold text-center">後臺設定</h1>
            </div>
            {children}
        </section>
    );
}