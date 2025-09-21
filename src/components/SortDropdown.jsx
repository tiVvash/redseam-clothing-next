"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";

export default function SortDropdown() {
    const [open, setOpen] = useState(false);
    const { sort, setSort } = useData();

    const options = [
        { label: "New products first", value: "-created_at" },
        { label: "Old products first", value: "created_at" },
        { label: "Price: Low to High", value: "price" },
        { label: "Price: High to Low", value: "-price" },
    ];


    const handleSelect = (value) => {
        setSort(value);
        setOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-[#10151F]"
            >
                <span className="text-[16px]">
                    {options.find((o) => o.value === sort)?.label || "Sort by"}
                </span>
                <img src="/chevron-down.svg" alt="Dropdown" className="w-4 h-4" />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-[223px] bg-white border border-gray-200 rounded-lg z-10">
                    <h3 className="text-[#10151F] text-lg font-semibold w-full px-4 py-2">Sort By</h3>
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className={`w-full text-left px-4 py-2 text-[#10151F] hover:bg-gray-100 ${sort === option.value ? "font-semibold" : "font-normal"
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
