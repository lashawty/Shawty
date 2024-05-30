export default function DashboardTemplate({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <section className="flex h-screen w-screen flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
            {children}
        </section>
    );
}