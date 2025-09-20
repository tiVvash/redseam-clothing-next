"use client";

import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [priceFrom, setPriceFrom] = useState(null);
  const [priceTo, setPriceTo] = useState(null);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    setLoading(true);

    const params = {
      page,
      ...(priceFrom !== null && { "filter[price_from]": priceFrom }),
      ...(priceTo !== null && { "filter[price_to]": priceTo }),
      ...(sort && { sort }),
    };

    const url = `https://api.redseam.redberryinternship.ge/api/products?${new URLSearchParams(params).toString()}`;

    fetch(url, { headers: { Accept: "application/json" } })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((json) => setProducts(json.data)) // ⚡ use json.data
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, priceFrom, priceTo, sort]);

  return (
    <DataContext.Provider
      value={{
        products,
        loading,
        page,
        setPage,
        priceFrom,
        setPriceFrom,
        priceTo,
        setPriceTo,
        sort,
        setSort,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);


// const colorMap = {
//     White: "#FFFFFF",
//     Red: "#FF0000",
//     Multi: "linear-gradient(90deg, red, yellow, green, blue)",
//     Blue: "#0000FF",
//     "Navy Blue": "#001F54",
//     Grey: "#808080",
//     Black: "#000000",
//     Purple: "#800080",
//     Orange: "#FFA500",
//     Beige: "#F5F5DC",
//     Pink: "#FFC0CB",
//     Green: "#008000",
//     Cream: "#FFFDD0",
//     Maroon: "#800000",
//     Brown: "#A52A2A",
//     Peach: "#FFE5B4",
//     "Off White": "#F8F8F0",
//     Mauve: "#E0B0FF",
//     Yellow: "#FFFF00",
//     Magenta: "#FF00FF",
//     Khaki: "#F0E68C",
//     Olive: "#808000",
//   };