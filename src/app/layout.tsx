import type { Metadata } from "next";
import {Inter, Noto_Sans_TC} from 'next/font/google';
import "./globals.css";
import {AuthProvider, AlertProvider} from '@/components/provider';

const notoSansTC = Noto_Sans_TC({weight: ['300', '500', '700'], subsets: ["latin"]})

export const metadata: Metadata = {
  title: "SHAWTY",
  description: "Find the best beauty nearby.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSansTC.className}>
        <AuthProvider>
            <AlertProvider>
                  <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
                      {children}
                  </main>
            </AlertProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
