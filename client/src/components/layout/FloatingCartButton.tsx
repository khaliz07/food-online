import React from "react";
import { Link } from "wouter";
import Icon from "../ui/icon";
import { useCart } from "@/context/CartContext";

const FloatingCartButton: React.FC = () => {
  const { items } = useCart();
  
  // Calculate total items in cart
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Don't show if cart is empty
  if (totalItems === 0) {
    return null;
  }
  
  return (
    <div className="fixed bottom-20 right-4 z-40">
      <Link href="/cart">
        <button className="bg-primary text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center">
          <Icon name="ri-shopping-cart-2-line text-2xl" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        </button>
      </Link>
    </div>
  );
};

export default FloatingCartButton;
