'use client';

import FilterDropDown from "./FilterDropDown";
import SortDropdown from "./SortDropdown";

export default function ProductFilter() {
    return (
        <section className="flex justify-between items-center mx-[100px] mt-[72px] mb-[32px]">
            <h2 className="text-[42px] font-semibold text-[#10151F]">Products</h2>
            <div className="flex items-center gap-8 text-[#10151F] font-poppins">
                <span className="text-[12px] text-[#3E424A]">
                    Showing 1–10 of 100 results
                </span>
                <div className="w-px h-4 bg-[#E1DFE1]" />
                <div className="flex items-center gap-2 cursor-pointer">
                    <FilterDropDown />
                </div>
                <div className="flex items-center gap-1 cursor-pointer">
                   <SortDropdown/>
                </div>
            </div>
        </section>
    );
}