"use client";
import { useState } from "react";
import { useData } from "@/context/DataContext";

export default function FilterDropDown() {
    const [open, setOpen] = useState(false);
    const { priceFrom, setPriceFrom, priceTo, setPriceTo } = useData();

    const handleApply = () => {
        setPriceFrom(priceFrom < 0 ? 0 : priceFrom);
        setOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-[#10151F]"
            >
                <img src="/adjustments-horizontal.svg" alt="" />
                <span className="text-[16px]">Filter</span>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-[392px] rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
                    <h3 className="text-[#10151F] text-lg font-semibold mb-4">Select price</h3>

                    <div className="flex gap-4 mb-4">
                        <input
                            type="number"
                            min={0}
                            value={priceFrom || ""}
                            onChange={(e) => setPriceFrom(Number(e.target.value))}
                            placeholder="From"
                            className="w-1/2 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700"
                        />
                        <input
                            type="number"
                            min={priceFrom || 0}
                            value={priceTo || ""}
                            onChange={(e) => setPriceTo(Number(e.target.value))}
                            placeholder="To"
                            className="w-1/2 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700"
                        />
                    </div>

                    <button onClick={handleApply} className="ml-auto w-[124px] h-[41px] flex items-center justify-center gap-2 bg-[#FF4000] text-white rounded-lg hover:bg-[#e63a00]">
                        Apply
                    </button>
                </div>
            )}
        </div>
    );
}
