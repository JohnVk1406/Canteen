"use client";

import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import { useState } from "react";

const menuItems = [
	{
		id: 1,
		name: "Chicken Biriyani",
		price: 249,
		image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
	},
	{
		id: 2,
		name: "Vegetable Biriyani",
		price: 249,
		image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop",
	},
	{
		id: 3,
		name: "Meals",
		price: 249,
		image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
	},
	{
		id: 4,
		name: "Dosa",
		price: 249,
		image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop",
	},
	{
		id: 5,
		name: "Poori",
		price: 249,
		image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
	},
];

export default function Home() {
	const { addToCart } = useCart();
	const [quantities, setQuantities] = useState<Record<number, number>>({});
	const [addedItems, setAddedItems] = useState<Record<number, boolean>>({});

	const handleQuantityChange = (itemId: number, change: number) => {
		setQuantities((prev) => {
			const currentQty = prev[itemId] || 0;
			const newQty = Math.max(0, currentQty + change);
			return { ...prev, [itemId]: newQty };
		});
	};

	const handleAddToCart = (item: typeof menuItems[0]) => {
		const quantity = quantities[item.id] || 1;

		// Add the item to cart multiple times based on quantity
		for (let i = 0; i < quantity; i++) {
			addToCart(item);
		}

		// Reset quantity and show success feedback
		setQuantities((prev) => ({ ...prev, [item.id]: 0 }));
		setAddedItems((prev) => ({ ...prev, [item.id]: true }));
		setTimeout(() => {
			setAddedItems((prev) => ({ ...prev, [item.id]: false }));
		}, 2000);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<Header />

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<h1 className="text-4xl font-bold text-gray-900 mb-8">Menu</h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					{menuItems.map((item) => {
						const quantity = quantities[item.id] || 0;
						const isAdded = addedItems[item.id];

						return (
							<div
								key={item.id}
								className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
							>
								<div className="relative h-48 bg-gray-200">
									<Image
										src={item.image}
										alt={item.name}
										fill
										className="object-cover"
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
									/>
								</div>
								<div className="p-4">
									<h3 className="text-lg font-semibold text-gray-900 mb-2">
										{item.name}
									</h3>
									<p className="text-gray-700 font-medium mb-3">
										₹{item.price}
									</p>

									{/* Quantity Controls */}
									<div className="flex items-center gap-3 mb-3">
										<button
											onClick={() => handleQuantityChange(item.id, -1)}
											disabled={quantity === 0}
											className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4 text-gray-700"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M20 12H4"
												/>
											</svg>
										</button>

										<span className="font-semibold text-gray-900 w-12 text-center text-lg">
											{quantity}
										</span>

										<button
											onClick={() => handleQuantityChange(item.id, 1)}
											className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4 text-gray-700"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M12 4v16m8-8H4"
												/>
											</svg>
										</button>
									</div>

									{/* Add to Cart Button */}
									<button
										onClick={() => handleAddToCart(item)}
										disabled={quantity === 0 && !isAdded}
										className={`w-full ${
											isAdded
												? "bg-green-600"
												: quantity === 0
												? "bg-gray-300 cursor-not-allowed"
												: "bg-green-500 hover:bg-green-600"
										} text-white font-semibold py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2`}
									>
										{isAdded ? (
											<>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M5 13l4 4L19 7"
													/>
												</svg>
												Added to Cart
											</>
										) : (
											<>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
													/>
												</svg>
												{quantity === 0
													? "Select Quantity"
													: `Add ${quantity} to Cart`}
											</>
										)}
									</button>

									{/* Total Price Display */}
									{quantity > 0 && (
										<p className="text-center text-sm text-gray-600 mt-2">
											Total: ₹{item.price * quantity}
										</p>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</main>

			<footer className="bg-white border-t mt-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div>
							<div className="flex items-center gap-2 mb-4">
								<span className="text-2xl">🍵</span>
							</div>
							<p className="text-sm text-gray-600">
								© 2024 Food Ordering. All rights reserved.
							</p>
						</div>

						<div>
							<h4 className="font-semibold text-gray-900 mb-4">About Us</h4>
							<ul className="space-y-2">
								<li>
									<a
										href="#"
										className="text-gray-600 hover:text-gray-900 text-sm"
									>
										Our Story
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-600 hover:text-gray-900 text-sm"
									>
										Blog
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-600 hover:text-gray-900 text-sm"
									>
										Careers
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h4 className="font-semibold text-gray-900 mb-4">Support</h4>
							<ul className="space-y-2">
								<li>
									<a
										href="#"
										className="text-gray-600 hover:text-gray-900 text-sm"
									>
										Help Center
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-600 hover:text-gray-900 text-sm"
									>
										Contact Us
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-600 hover:text-gray-900 text-sm"
									>
										FAQs
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
							<ul className="space-y-2">
								<li>
									<a
										href="#"
										className="text-gray-600 hover:text-gray-900 text-sm"
									>
										Terms of Service
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-600 hover:text-gray-900 text-sm"
									>
										Privacy Policy
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-600 hover:text-gray-900 text-sm"
									>
										Cookie Policy
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
