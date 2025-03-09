
import "./globals.css";

import "@public/styles/styles.scss";
import "@public/styles/line-awesome.min.css";
import {getLocale, getMessages} from 'next-intl/server';
import {NextIntlClientProvider} from 'next-intl';
import {Toaster} from "react-hot-toast";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/loading/spinner.css';
import React from "react";
import { CurrencyProvider } from "./(pricing)/context/CurrencyContext";
import { ThemeProvider } from "./(pricing)/components/theme/ThemeProvider";


export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();
    const messages = await getMessages();
    return (
        <html lang={locale}>
        <body className="flex flex-col min-h-screen bg-[var(--bg-1)] text-[var(--neutral-700)]">
            <ToastContainer />
            <Toaster toastOptions={{ duration: 4000 }} />
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider>
                        <CurrencyProvider>
                            <main className="flex-grow min-h-[72vh]">
                                {children}
                            </main>
                        </CurrencyProvider>
                    </ThemeProvider>
                </NextIntlClientProvider>
        </body>
        </html>
    );
}