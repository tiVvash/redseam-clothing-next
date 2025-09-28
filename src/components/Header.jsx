"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useData } from "@/context/DataContext";

export default function Header() {
    const { user, token, logout } = useData();
    const isLoggedIn = Boolean(token);
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { toggleCart } = useData();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };


    return (
        <header className="w-full">
            <div className="flex justify-between items-center px-24 py-2.5">
                <div className="flex items-center">
                    <Link href='/'>
                        <img
                            src="/Logo.svg"
                            alt="RedSeam Clothing Logo"
                            className="inline-block h-10 w-auto"
                        />
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-5">
                            <button
                                className="relative w-6 h-6 cursor-pointer"
                                onClick={toggleCart}
                            >
                                <img
                                    src="/shopping-cart.svg"
                                    alt="Cart"
                                    className="w-6 h-6"
                                />
                            </button>

                            <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => setDropdownOpen((prev) => !prev)}
                            >
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <img
                                        src={user?.profile_photo || "/avatar.jpg"}
                                        alt="User Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <img
                                    src="/chevron-down.svg"
                                    alt="Dropdown"
                                    className="w-5 h-5"
                                />
                            </div>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (<>
                        <img
                            src="/user.svg"
                            alt="user"
                            className="inline-block h-6 w-6"
                        />
                        <button className="bg-transparent border-none text-black cursor-pointer text-base p-0 hover:underline"> <Link href="/login">Log In</Link>
                        </button>

                    </>
                    )}
                </div>
            </div>
        </header>
    );
}
