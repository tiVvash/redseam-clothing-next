"use client";

import Image from "next/image";
import Link from "next/link";

export default function RegisterForm() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-12 w-[554px] bg-white p-8 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <Image
              src="/Ellipse 1.svg"
              alt="Avatar"
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
          <div className="flex gap-4 text-sm text-[#3E424A]">
            <button className="hover:text-red-500">Upload new</button>
            <button className="hover:text-red-500">Remove</button>
          </div>
        </div>

     
        <div className="flex flex-col gap-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full border border-[#E1DFE1] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-[#E1DFE1] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-[#E1DFE1] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full border border-[#E1DFE1] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
        </div>

        <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium">
          Register
        </button>

        <p className="text-sm text-center text-[#3E424A]">
          Already member?{" "}
          <Link href="/login" className="text-red-500 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
