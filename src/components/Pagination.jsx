"use client";

export default function Pagination({ page, setPage, totalPages }) {
    const getPages = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (page > 3) pages.push("...");
            const start = Math.max(2, page - 1);
            const end = Math.min(totalPages - 1, page + 1);

            for (let i = start; i <= end; i++) pages.push(i);
            if (page < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };
    return (
        <div className="flex items-center justify-center gap-2 mt-[90px] mb-[216px]">
            <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 disabled:opacity-50"
            >
                <img src="/chevron-left.svg" alt="Previous" />
            </button>

            {getPages().map((p, i) =>
        p === "..." ? (
          <span key={i} className="w-8 h-8 flex items-center justify-center text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={i}
            onClick={() => setPage(p)}
            className={`w-8 h-8 flex items-center justify-center rounded border text-sm font-medium ${
              page === p
                ? "border-[#FF4000] text-[#FF4000] bg-white"
                : "border-gray-100 text-gray-700 opacity-60 bg-white"
            }`}
          >
            {p}
          </button>
        )
      )}
            <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded border border-gray-200"
            >
                <img src="/chevron-right.svg" alt="Next" />
            </button>
        </div>
    );
}
