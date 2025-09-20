"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <header className="w-full border-b border-gray-200">
            <div className="flex justify-between items-center px-24 py-2.5">
                <div className="flex items-center">
                    <img
                        src="/logo.svg"
                        alt="RedSeam Clothing Logo"
                        className="inline-block h-10 w-auto"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <img
                        src="/user.svg"
                        alt="user"
                        className="inline-block h-6 w-6"
                    />
                    <button className="bg-transparent border-none text-black cursor-pointer text-base p-0 hover:underline"> <Link href="/login">Log In</Link>
                    </button>
                </div>
            </div>
        </header>
    );
}
