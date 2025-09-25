import React from "react";

const colorMap = {
  White: "#FFFFFF",
  Red: "#FF0000",
  Multi: "linear-gradient(90deg, red, yellow, green, blue)",
  Blue: "#0000FF",
  "Navy Blue": "#001F54",
  Grey: "#808080",
  Black: "#000000",
  Purple: "#800080",
  Orange: "#FFA500",
  Beige: "#F5F5DC",
  Pink: "#FFC0CB",
  Green: "#008000",
  Cream: "#FFFDD0",
  Maroon: "#800000",
  Brown: "#A52A2A",
  Peach: "#FFE5B4",
  "Off White": "#F8F8F0",
  Mauve: "#E0B0FF",
  Yellow: "#FFFF00",
  Magenta: "#FF00FF",
  Khaki: "#F0E68C",
  Olive: "#808000",
};

export default function ProductInfo({ product, selectedColor, setSelectedColor, selectedSize, setSelectedSize }) {
  return (
    <div className="flex flex-col gap-10 w-full md:w-[704px]">
      {/* Name & Price */}
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-semibold text-[#10151F]">{product.name}</h1>
        <p className="text-3xl font-semibold text-[#10151F]">${product.price}</p>
      </div>

      {/* Color selection */}
      <div className="flex flex-col gap-4">
        <p className="text-base text-[#10151F]">Color: {selectedColor?.name || "N/A"}</p>
        <div className="flex gap-3">
          {(product.colors || []).map((color) => (
            <div
              key={color.id}
              onClick={() => setSelectedColor(color)}
              className={`w-10 h-10 rounded-full border cursor-pointer ${
                selectedColor?.id === color.id ? "border-red-500" : "border-gray-300"
              }`}
              style={{ background: colorMap[color.name] || "#ccc" }}
            />
          ))}
        </div>
      </div>

      {/* Size selection */}
      <div className="flex flex-col gap-4">
        <p className="text-base text-[#10151F]">Size: {selectedSize?.name || "N/A"}</p>
        <div className="flex gap-2">
          {(product.sizes || []).map((size) => (
            <button
              key={size.id}
              onClick={() => setSelectedSize(size)}
              className={`w-16 h-10 rounded border ${
                selectedSize?.id === size.id
                  ? "bg-gray-100 border-[#10151F]"
                  : "bg-white border-gray-300 text-[#10151F] text-opacity-80"
              }`}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
