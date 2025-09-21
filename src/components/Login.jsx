'use client';

import LoginForm from "./LoginForm";

export default function Login() {
    return (
        <div className="flex w-full h-screen">
            <div className="flex-1 bg-gray-100">
                <img src="/LoginPic.png" alt="" />
            </div>
            <div className="flex-1 flex items-center justify-center">
                <LoginForm />
            </div>
        </div>
    )
}