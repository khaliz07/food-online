import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Icon from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/CartContext";
import { Restaurant } from "@/lib/types";

const CartItems: React.FC = () => {
  const { 
    items, 
    restaurant, 
    subtotal, 
    deliveryFee, 
    discount, 
    total,
    updateQuantity,
    removeItem,
    setDiscount
  } = useCart();
  
  const [promoCode, setPromoCode] = useState("");
  const [note, setNote] = useState("");
  
  const { data: restaurantData, isLoading: isLoadingRestaurant } = useQuery<Restaurant>({
    queryKey: [restaurant ? `/api/restaurants/${restaurant.id}` : null],
    enabled: !!restaurant
  });
  
  const handleQuantityChange = (id: number, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };
  
  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    
    // In a real app, would validate with API
    if (promoCode === "WELCOME50") {
      setDiscount(50000);
      alert("Mã giảm giá đã được áp dụng!");
    } else if (promoCode === "FREESHIP") {
      setDiscount(deliveryFee);
      alert("Mã freeship đã được áp dụng!");
    } else {
      alert("Mã giảm giá không hợp lệ!");
    }
  };
  
  // Empty cart
  if (items.length === 0) {
    return (
      <div className="p-4 text-center">
        <div className="py-10">
          <Icon name="ri-shopping-cart-2-line text-5xl text-neutral-300 mb-4" />
          <p className="text-neutral-600">Giỏ hàng của bạn đang trống</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200 p-3 mb-4">
        {isLoadingRestaurant ? (
          <div className="pb-3 border-b border-neutral-200">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-20" />
          </div>
        ) : (
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <div className="flex items-center">
              <Icon name="ri-store-2-line text-primary text-lg mr-2" />
              <h3 className="font-medium">{restaurant?.name}</h3>
            </div>
            <span className="text-neutral-600 text-sm">{restaurant?.distance} km</span>
          </div>
        )}
        
        <div className="py-3 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-lg overflow-hidden mr-3">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <span className="text-primary">{item.price.toLocaleString()}đ</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <button 
                  className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                >
                  <Icon name="ri-subtract-line" />
                </button>
                <span className="mx-3 font-medium">{item.quantity}</span>
                <button 
                  className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  <Icon name="ri-add-line" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-3 border-t border-neutral-200">
          <div className="flex items-center mb-2">
            <Icon name="ri-coupon-line text-primary mr-2" />
            <span className="text-neutral-900">Mã giảm giá</span>
            <Icon name="ri-arrow-right-s-line ml-auto" />
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Nhập mã giảm giá" 
              className="w-full py-2 px-3 bg-neutral-100 rounded-lg text-sm focus:outline-none"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary font-medium text-sm"
              onClick={handleApplyPromo}
            >
              Áp dụng
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200 p-3 mb-4">
        <h3 className="font-medium mb-3">Ghi chú</h3>
        <textarea 
          placeholder="Ghi chú cho nhà hàng..." 
          className="w-full p-3 bg-neutral-100 rounded-lg text-sm focus:outline-none resize-none" 
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200 p-3 mb-4">
        <h3 className="font-medium mb-3">Tóm tắt đơn hàng</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-600">Tổng tiền hàng</span>
            <span>{subtotal.toLocaleString()}đ</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Phí giao hàng</span>
            <span>{deliveryFee.toLocaleString()}đ</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between">
              <span className="text-neutral-600">Giảm giá</span>
              <span className="text-green-600">-{discount.toLocaleString()}đ</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-neutral-200 mt-2">
            <span className="font-semibold">Tổng thanh toán</span>
            <span className="font-semibold text-primary">{total.toLocaleString()}đ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
