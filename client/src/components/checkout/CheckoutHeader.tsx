import React from "react";
import { useLocation } from "wouter";
import Icon from "@/components/ui/icon";

const CheckoutHeader: React.FC = () => {
  const [, setLocation] = useLocation();
  
  const handleBack = () => {
    setLocation("/cart");
  };
  
  return (
    <div className="sticky top-0 bg-white z-20 shadow-sm">
      <div className="flex items-center justify-between p-4">
        <button className="flex items-center" onClick={handleBack}>
          <Icon name="ri-arrow-left-s-line text-2xl" />
          <span className="font-poppins font-semibold text-lg ml-2">Thanh toán</span>
        </button>
      </div>
    </div>
  );
};

export default CheckoutHeader;
