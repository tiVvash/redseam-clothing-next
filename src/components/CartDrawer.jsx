"use client";

import { useData } from "../context/DataContext";
import { useEffect } from "react";
import Link from "next/link";

export default function CartDrawer() {
    const { cart, cartOpen, toggleCart, updateCart, removeFromCart } = useData();


    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") toggleCart();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [toggleCart]);

    const subtotal = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

    const handleIncrease = (productId) => {
        const item = cart.find((i) => i.productId === productId);
        if (!item) return;
        updateCart({ productId, quantity: item.quantity + 1 });
    };

    const handleDecrease = (productId) => {
        const item = cart.find((i) => i.productId === productId);
        if (!item) return;
        if (item.quantity > 1) {
            updateCart({ productId, quantity: item.quantity - 1 });
        }
    };

    const handleRemove = (productId) => {
        removeFromCart(productId);
    };

    const delivery = 5;
    const total = subtotal + delivery;

    if (!cartOpen) return null;

    return (
        <div className="fixed top-0 right-0 h-full w-[540px] bg-[#F8F6F7] border-l border-[#E1DFE1] shadow-lg z-50 p-6 overflow-y-auto flex flex-col">
            <button
                onClick={toggleCart}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#10151F]"
            >
                ✕
            </button>

            <h2 className="text-[#10151F] text-2xl font-semibold mb-6">Shopping Cart</h2>

            <div className="space-y-4 flex-1 overflow-y-auto">
                {cart.length === 0 ? (

                    <div className="flex flex-col items-center justify-center h-full text-center mt-5">
                        <img src="/Cart.svg" alt="Empty Cart" className="w-32 h-32 mb-6" />
                        <h3 className="text-[#10151F] text-2xl font-semibold mb-2">Ooops!</h3>
                        <p className="text-gray-500 mb-6">You have got nothing in your cart just yet..</p>
                        <Link href="/">
                            <button className="bg-[#FF4000] hover:bg-[#e63a00] text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                                Start Shopping
                            </button>
                        </Link>
                    </div>
                ) : (
                    cart.map((item) => (
                        <div key={item.productId} className="flex gap-4 items-center border p-2 rounded-lg">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-24 object-cover rounded"
                            />
                            <div className="flex-1 flex flex-col justify-between h-full">
                                <div>
                                    <h3 className="text-[#10151F] font-medium">{item.name}</h3>
                                    <p className="text-gray-500 text-sm">{item.color} / {item.size}</p>
                                    <p className="text-[#10151F] font-semibold">${item.price}</p>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() => handleDecrease(item.productId)}
                                        className="w-6 h-6 flex items-center justify-center border rounded-full text-gray-500"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => handleIncrease(item.productId)}
                                        className="w-6 h-6 flex items-center justify-center border rounded-full text-gray-500"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => handleRemove(item.productId)}
                                        className="ml-auto text-red-500 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {cart.length > 0 && (
                <div className="mt-6">
                    <div className="flex justify-between text-[#10151F] font-medium mb-4">
                        <span>Subtotal</span>
                        <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-[#10151F] font-medium">
                        <span>Delivery</span>
                        <span>${delivery}</span>
                    </div>
                    <div className="flex justify-between text-[#10151F] font-semibold text-lg">
                        <span>Total</span>
                        <span>${total}</span>
                    </div>
                    <button className="w-full bg-[#FF4000] hover:bg-[#e63a00] text-white py-3 rounded-lg font-semibold transition-colors">
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
}
