'use client';

import Header from "@/components/Header";
import { DataProvider } from "@/context/DataContext";

export default function Register() {
    return (
        <DataProvider>
            <Header />
        </DataProvider>
    )
}