"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useData } from "@/context/DataContext";
import ProductInfo from "@/components/ProductInfo";
import Header from "@/components/Header";

export default function ProductDetail() {
    const { id } = useParams();
    const { fetchProductById } = useData();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState("");
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        async function loadProduct() {
            setLoading(true);
            try {
                const data = await fetchProductById(id);
                console.log("Fetched product:", data);

                const colors = data.available_colors?.map((name, index) => ({
                    id: index,
                    name,
                })) || [];

                const sizes = data.available_sizes?.map((name, index) => ({
                    id: index,
                    name,
                })) || [];

                setProduct({ ...data, colors, sizes });
                if (data.images?.length > 0) setMainImage(data.images[0]);
                setSelectedColor(colors[0] || null);
                setSelectedSize(sizes[0] || null);
            } catch (err) {
                console.error("Failed to fetch product:", err);
            } finally {
                setLoading(false);
            }
        }

        if (id) loadProduct();
    }, [id]);


    const handleColorSelect = (color) => {
        setSelectedColor(color);
        if (product.images?.length && product.colors?.length) {
            const colorIndex = product.colors.findIndex((c) => c.id === color.id);
            if (colorIndex !== -1 && product.images[colorIndex]) {
                setMainImage(product.images[colorIndex]);
            }
        }
    };

    if (loading) return <p className="text-center mt-20">Loading product...</p>;
    if (!product) return <p className="text-center mt-20">Product not found</p>;

    return (
        <>
            <Header />
            <div className="flex flex-col md:flex-row  mx-[100px] py-10 gap-20">

                <div className="flex gap-4">

                    <div className="flex flex-col gap-4 md:w-[126px]">
                        {product.images?.map((img, idx) => (
                            <img
                                key={idx}
                                src={img || "/placeholder.png"}
                                alt={`${product.name} ${idx}`}
                                className={`w-full object-cover rounded cursor-pointer border-2 ${img === mainImage ? "border-red-500" : "border-gray-200"
                                    }`}
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>


                    <div className="flex-1">
                        <img
                            src={mainImage || "/placeholder.png"}
                            alt={product?.name || "Product"}
                            className="w-full  md:h-[700px] object-cover rounded-lg"
                        />
                    </div>
                </div>

                <ProductInfo
                    product={product}
                    selectedColor={selectedColor}
                    setSelectedColor={handleColorSelect}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                />
            </div>
        </>
    );
}
