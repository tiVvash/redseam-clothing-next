"use client";
import { useData } from "@/context/DataContext";

export default function ProductList() {
  const { products, loading, page, setPage } = useData();

  if (loading) return <p>Loading...</p>;
  if (!products.length) return <p>No products found</p>;

  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center px-[100px]">
        {products.map((p) => (
          <li
            key={p.id}
            className="flex flex-col w-[412px] h-[614px] bg-white rounded-lg overflow-hidden"
          >
            <img
              src={p.cover_image || "/placeholder.png"}
              alt={p.name}
              className="w-full h-[549px] object-cover bg-gray-200"
            />
            <div className="flex flex-col p-2 gap-1 h-[65px]">
              <h2 className="text-lg font-medium text-[#10151F]">{p.name}</h2>
              <p className="text-base font-medium text-[#10151F]">${p.price}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex gap-4 mt-6 justify-center items-center">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-base font-medium">Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded"
        >
          Next
        </button>
      </div>
    </>
  );
}

