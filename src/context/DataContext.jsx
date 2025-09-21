"use client";

import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [authError, setAuthError] = useState("");
    const [authLoading, setAuthLoading] = useState(false);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(null);
    const [sort, setSort] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) setToken(savedToken);
    }, []);
    useEffect(() => {
        fetchProducts();
    }, [page, priceFrom, priceTo, sort]);

    const fetchProducts = async (overridePage) => {
        setLoading(true);
        try {
            const currentPage = overridePage || page;
            const params = {
                page: currentPage,
                ...(priceFrom !== null && { "filter[price_from]": priceFrom }),
                ...(priceTo !== null && { "filter[price_to]": priceTo }),
                ...(sort && { sort }),
            };

            const url = `https://api.redseam.redberryinternship.ge/api/products?${new URLSearchParams(
                params
            ).toString()}`;

            const res = await fetch(url, { headers: { Accept: "application/json" } });
            if (!res.ok) throw new Error("Failed to fetch products");

            const json = await res.json();
            setProducts(json.data || []);
            setTotalPages(Math.ceil(json.meta.total / 10));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setAuthError("");
        setAuthLoading(true);
        try {
            const res = await fetch("https://api.redseam.redberryinternship.ge/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Login failed");
            }

            const data = await res.json();
            setToken(data.token);
            setUser(data.user || null);
            localStorage.setItem("token", data.token);
            return true;
        } catch (err) {
            setAuthError(err.message);
            return false;
        } finally {
            setAuthLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <DataContext.Provider
            value={{
                products,
                loading,
                page,
                setPage,
                totalPages,
                priceFrom,
                setPriceFrom,
                priceTo,
                setPriceTo,
                sort,
                setSort,
                fetchProducts,
                token,
                user,
                authError,
                authLoading,
                login,
                logout,
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