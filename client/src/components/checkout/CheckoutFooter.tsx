import React, { useState } from "react";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useCart } from "@/context/CartContext";

const CheckoutFooter: React.FC = () => {
  const [, setLocation] = useLocation();
  const { items, restaurant, total, deliveryFee, discount, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmitOrder = async () => {
    if (!restaurant || items.length === 0) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would use the actual user ID from authentication
      const userId = 1;
      
      const orderData = {
        userId,
        restaurantId: restaurant.id,
        total,
        deliveryFee,
        discount,
        status: "pending",
        paymentMethod: "cash", // This would be dynamic in a real app
        address: "KTX Khu A, ĐHQG TP. HCM, Dĩ An, Bình Dương", // This would be from user input
        items: items.map(item => ({
          foodItemId: item.id,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity
        }))
      };
      
      const response = await apiRequest("POST", "/api/orders", orderData);
      const orderResult = await response.json();
      
      // Clear cart after successful order
      clearCart();
      
      // Navigate to tracking page with the new order ID
      setLocation(`/tracking/${orderResult.id}`);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 pb-6 shadow-md z-10">
      <button 
        className={`bg-primary text-white w-full py-3 rounded-xl font-semibold ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
        }`}
        onClick={handleSubmitOrder}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt hàng"}
      </button>
    </div>
  );
};

export default CheckoutFooter;
