import React from "react";
import { Link } from "wouter";
import { useCart } from "@/context/CartContext";

const CartFooter: React.FC = () => {
  const { items } = useCart();
  
  // Disable button if cart is empty
  const isDisabled = items.length === 0;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 pb-6 shadow-md z-10">
      {isDisabled ? (
        <button 
          className="bg-neutral-300 text-white w-full py-3 rounded-xl font-semibold cursor-not-allowed"
          disabled
        >
          Tiến hành thanh toán
        </button>
      ) : (
        <Link href="/checkout">
          <button className="bg-primary text-white w-full py-3 rounded-xl font-semibold">
            Tiến hành thanh toán
          </button>
        </Link>
      )}
    </div>
  );
};

export default CartFooter;
