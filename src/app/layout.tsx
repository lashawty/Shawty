import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {AuthProvider, AlertProvider} from '@/components/provider';

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
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
