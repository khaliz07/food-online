import React from "react";
import { useLocation } from "wouter";
import Icon from "@/components/ui/icon";
import { useCart } from "@/context/CartContext";

const CartHeader: React.FC = () => {
  const [, setLocation] = useLocation();
  const { clearCart } = useCart();
  
  const handleBack = () => {
    const previousPath = document.referrer;
    if (previousPath.includes("/restaurant")) {
      window.history.back();
    } else {
      setLocation("/");
    }
  };
  
  const handleClearCart = () => {
    if (window.confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?")) {
      clearCart();
    }
  };
  
  return (
    <div className="sticky top-0 bg-white z-20 shadow-sm">
      <div className="flex items-center justify-between p-4">
        <button className="flex items-center" onClick={handleBack}>
          <Icon name="ri-arrow-left-s-line text-2xl" />
          <span className="font-poppins font-semibold text-lg ml-2">Giỏ hàng</span>
        </button>
        <button className="text-neutral-600" onClick={handleClearCart}>
          <Icon name="ri-delete-bin-line text-xl" />
        </button>
      </div>
    </div>
  );
};

export default CartHeader;
