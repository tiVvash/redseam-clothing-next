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

    const [singleProduct, setSingleProduct] = useState(null);
const [singleLoading, setSingleLoading] = useState(false);

const fetchProductById = async (id) => {
  setSingleLoading(true);
  try {
    const res = await fetch(
      `https://api.redseam.redberryinternship.ge/api/products/${id}`,
      { headers: { Accept: "application/json" } }
    );

    if (!res.ok) throw new Error("Failed to fetch product");

    const json = await res.json();
    setSingleProduct(json);
    return json;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    setSingleLoading(false);
  }
};

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
          const res = await fetch("/api/login", {
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

      const register = async (formData) => {
        setAuthError("");
        setAuthLoading(true);
        try {
            fetch("/api/register", { method: "POST", body: formData })
    
          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || "Registration failed");
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
                singleProduct,
                singleLoading,
                fetchProductById,
                token,
                user,
                authError,
                authLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
