"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const totalPrice = getTotalPrice();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some delicious items to get started!</p>
            <Link
              href="/"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
            >
              Browse Menu
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4"
              >
                <div className="relative h-24 w-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>

                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  
                  <span className="font-semibold text-gray-900 w-8 text-center">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    ₹{item.price * item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors ml-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>₹40</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (5%)</span>
                  <span>₹{Math.round(totalPrice * 0.05)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{totalPrice + 40 + Math.round(totalPrice * 0.05)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300 mb-4">
                Proceed to Checkout
              </button>

              <Link
                href="/"
                className="block text-center text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
