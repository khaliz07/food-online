import React, { useState } from "react";
import Icon from "@/components/ui/icon";
import { useCart } from "@/context/CartContext";

const CheckoutForm: React.FC = () => {
  const { subtotal, deliveryFee, discount, total } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  
  // In a real app, this would fetch from user profile or provide ability to add/edit
  const address = {
    title: "Nhà",
    address: "KTX Khu A, ĐHQG TP. HCM, Dĩ An, Bình Dương"
  };
  
  return (
    <div className="p-4">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200 p-3 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Địa chỉ giao hàng</h3>
          <button className="text-primary text-sm font-medium">Thay đổi</button>
        </div>
        <div className="bg-neutral-50 rounded-lg p-3">
          <div className="flex items-start">
            <Icon name="ri-map-pin-line text-primary text-lg mt-0.5 mr-2" />
            <div>
              <h4 className="font-medium">{address.title}</h4>
              <p className="text-neutral-600 text-sm">{address.address}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200 p-3 mb-4">
        <h3 className="font-medium mb-3">Phương thức thanh toán</h3>
        <div className="space-y-3">
          <div 
            className="flex items-center bg-neutral-50 rounded-lg p-3 cursor-pointer"
            onClick={() => setPaymentMethod("cod")}
          >
            <input 
              type="radio" 
              name="payment" 
              id="cod" 
              checked={paymentMethod === "cod"} 
              onChange={() => setPaymentMethod("cod")}
              className="mr-3 h-4 w-4 accent-primary"
            />
            <label htmlFor="cod" className="flex items-center flex-1 cursor-pointer">
              <div className="w-8 h-8 bg-neutral-200 rounded-md flex items-center justify-center mr-2">
                <Icon name="ri-money-dollar-box-line text-lg" />
              </div>
              <span>Tiền mặt khi nhận hàng</span>
            </label>
          </div>
          
          <div 
            className="flex items-center bg-neutral-50 rounded-lg p-3 cursor-pointer"
            onClick={() => setPaymentMethod("ewallet")}
          >
            <input 
              type="radio" 
              name="payment" 
              id="ewallet" 
              checked={paymentMethod === "ewallet"} 
              onChange={() => setPaymentMethod("ewallet")}
              className="mr-3 h-4 w-4 accent-primary"
            />
            <label htmlFor="ewallet" className="flex items-center flex-1 cursor-pointer">
              <div className="w-8 h-8 bg-neutral-200 rounded-md flex items-center justify-center mr-2">
                <Icon name="ri-wallet-3-line text-lg" />
              </div>
              <span>Ví điện tử</span>
            </label>
          </div>
          
          <div 
            className="flex items-center bg-neutral-50 rounded-lg p-3 cursor-pointer"
            onClick={() => setPaymentMethod("card")}
          >
            <input 
              type="radio" 
              name="payment" 
              id="card" 
              checked={paymentMethod === "card"} 
              onChange={() => setPaymentMethod("card")}
              className="mr-3 h-4 w-4 accent-primary"
            />
            <label htmlFor="card" className="flex items-center flex-1 cursor-pointer">
              <div className="w-8 h-8 bg-neutral-200 rounded-md flex items-center justify-center mr-2">
                <Icon name="ri-bank-card-line text-lg" />
              </div>
              <span>Thẻ ngân hàng</span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200 p-3 mb-20">
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

export default CheckoutForm;
