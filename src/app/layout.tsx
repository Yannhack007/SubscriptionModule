"use client";
import "./globals.css";

import "@public/styles/styles.scss";
import "@public/styles/line-awesome.min.css";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/loading/spinner.css';
import React from "react";
import { CurrencyProvider } from "./(pricing)/context/CurrencyContext";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import { Suspense } from 'react';
import LoaderOverlay from "@/components/LoaderOverlay";
//import { AuthProvider } from "@/app/(pricing)/context/AuthContext";


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html >
            <body className="flex flex-col min-h-screen bg-[var(--bg-1)] text-[var(--neutral-700)]">

                <ToastContainer />
                <Toaster toastOptions={{ duration: 4000 }} />
                <ThemeProvider>
                    <CurrencyProvider>
                        <Suspense fallback={<LoaderOverlay/>}>
                            <main className="flex-grow min-h-[72vh]">

                                {children}
                            </main>
                        </Suspense>
                    </CurrencyProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}