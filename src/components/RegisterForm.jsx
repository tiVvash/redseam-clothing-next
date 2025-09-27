"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
    const context = useData();
    const router = useRouter();

    if (!context) {
        return (
            <div className="w-[554px] p-6 bg-white rounded-lg shadow-md">
                <p className="text-red-500">
                    DataProvider is missing. Wrap this component inside DataProvider.
                </p>
            </div>
        );
    }

    const { register, authError, authLoading } = context;

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [localError, setLocalError] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError("");
    
        if (password !== confirmPassword) {
          setLocalError("Passwords do not match");
          return;
        }
    
        setLoading(true);
    
        try {
          const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username,
              email,
              password,
              password_confirmation: confirmPassword,
            }),
          });
    
          const data = await res.json();
    
          if (!res.ok) {
            setLocalError(data.message || "Registration failed");
            return;
          }

          router.push("/login");
        } catch (err) {
          setLocalError(err.message);
        } finally {
          setLoading(false);
        }
      };
    
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col gap-12 w-[554px] bg-white p-8 rounded-lg">
            <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </div>
          <div className="flex gap-4 text-sm text-[#3E424A]">
            <button type="button" className="hover:text-red-500">Upload new</button>
            <button type="button" className="hover:text-red-500" onClick={() => setAvatar(null)}>Remove</button>
          </div>
        </div>


                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-[#E1DFE1] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-[#E1DFE1] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-[#E1DFE1] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border border-[#E1DFE1] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>

                    {(localError || authError) && (
                        <p className="text-sm text-red-500">{localError || authError}</p>
                    )}

                    <button
                        type="submit"
                        disabled={authLoading}
                        className={`w-full bg-[#FF4000] text-white py-2 rounded-lg text-sm font-medium ${authLoading ? "opacity-60 cursor-not-allowed" : "hover:bg-[#e63a00]"
                            }`}
                    >
                        {authLoading ? "Registering..." : "Register"}
                    </button>
                </form>

                    <p className="text-sm text-center text-[#3E424A]">
                        Already member?{" "}
                        <Link href="/login" className="text-red-500 font-medium">
                            Log in
                        </Link>
                    </p>
            </div>
        </div >
    );
}
