'use client';
import type { Metadata } from 'next';
import { Hubot_Sans, Mona_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';

const queryClient = new QueryClient();

const hubot_sans = Hubot_Sans({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--display-family',
});

const mona_sans = Mona_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--text-family',
});


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${hubot_sans.variable} ${mona_sans.variable} ${hubot_sans.className} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <QueryClientProvider client={queryClient}>
                        {children}
                        <Toaster />
                    </QueryClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
