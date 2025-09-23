'use client';

import Header from "@/components/Header";
import Register from "@/components/Register";
import { DataProvider } from "@/context/DataContext";

export default function register() {
    return (
        <DataProvider>
            <Header />
            <Register/>
        </DataProvider>
    )
}