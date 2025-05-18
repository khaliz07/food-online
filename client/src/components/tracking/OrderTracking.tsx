import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Icon from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { Order, OrderItem } from "@/lib/types";

interface OrderTrackingProps {
  orderId: number;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ orderId }) => {
  const { data: order, isLoading, refetch } = useQuery<Order & { items: OrderItem[] }>({
    queryKey: [`/api/orders/${orderId}`],
  });
  
  // Poll for order status updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [refetch]);
  
  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton className="h-40 rounded-xl mb-4" />
        <Skeleton className="h-60 rounded-xl" />
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="p-4 text-center py-10">
        <p className="text-neutral-600">Không thể tìm thấy thông tin đơn hàng</p>
      </div>
    );
  }
  
  // Order status steps
  const steps = [
    { id: "confirmed", label: "Đơn hàng đã xác nhận", time: "14:05" },
    { id: "preparing", label: "Đang chuẩn bị món ăn", time: "14:15" },
    { id: "delivering", label: "Đang giao hàng", time: "14:25" },
    { id: "delivered", label: "Đã giao hàng", time: "14:45" }
  ];
  
  // Determine current step based on order status
  const getStatusIndex = () => {
    switch (order.status) {
      case "pending": return -1;
      case "confirmed": return 0;
      case "preparing": return 1;
      case "delivering": return 2;
      case "delivered": return 3;
      default: return -1;
    }
  };
  
  const currentStep = getStatusIndex();
  
  return (
    <div className="p-4">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200 p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium">#{order.id.toString().padStart(8, '0')}</span>
          <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
            {order.status === "pending" ? "Chờ xác nhận" :
             order.status === "confirmed" ? "Đã xác nhận" :
             order.status === "preparing" ? "Đang chuẩn bị" :
             order.status === "delivering" ? "Đang giao" :
             order.status === "delivered" ? "Đã giao" : "Đang xử lý"}
          </span>
        </div>
        
        <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
          <div className="flex items-center">
            <Icon name="ri-store-2-line text-primary text-lg mr-2" />
            <h3 className="font-medium">{order.restaurant?.name || `Nhà hàng #${order.restaurantId}`}</h3>
          </div>
          <span className="text-neutral-600 text-sm">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        
        <div className="my-4">
          <div className="flex space-x-3">
            <div className="flex flex-col items-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className={`w-8 h-8 rounded-full ${
                    index <= currentStep 
                      ? index === currentStep 
                        ? "bg-primary" 
                        : "bg-green-500" 
                      : "bg-neutral-300"
                  } flex items-center justify-center text-white`}>
                    {index < currentStep ? (
                      <Icon name="ri-check-line" />
                    ) : index === currentStep ? (
                      <Icon name="ri-time-line" />
                    ) : (
                      <Icon name={index === steps.length - 1 ? "ri-flag-line" : "ri-time-line"} className="text-neutral-600" />
                    )}
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`w-px h-16 ${
                      index < currentStep 
                        ? "bg-green-500" 
                        : index === currentStep 
                          ? "bg-primary" 
                          : "bg-neutral-300"
                    }`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            <div className="flex-1">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="h-8 flex items-center">
                    <span className={`font-medium ${index <= currentStep ? "" : "text-neutral-600"}`}>
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && <div className="h-16"></div>}
                </React.Fragment>
              ))}
            </div>
            
            <div className="flex flex-col items-end text-sm text-neutral-600">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="h-8 flex items-center">
                    <span>{index <= currentStep ? step.time : index === steps.length - 1 ? `Dự kiến ${step.time}` : ""}</span>
                  </div>
                  {index < steps.length - 1 && <div className="h-16"></div>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center bg-neutral-50 rounded-lg p-3 mb-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
            <Icon name="ri-user-3-line text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">Nguyễn Văn An</h4>
            <p className="text-neutral-600 text-sm">Shipper của bạn</p>
          </div>
          <button className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
            <Icon name="ri-phone-line" />
          </button>
        </div>
        
        <div className="flex items-center bg-neutral-50 rounded-lg p-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
            <Icon name="ri-map-pin-line text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">Địa chỉ giao hàng</h4>
            <p className="text-neutral-600 text-sm">{order.address}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200 p-3 mb-4">
        <h3 className="font-medium border-b border-neutral-200 pb-2 mb-3">Chi tiết đơn hàng</h3>
        
        <div className="space-y-3 mb-3">
          {order.items?.map((item) => (
            <div key={item.id} className="flex justify-between">
              <div className="flex-1">
                <span className="font-medium">{item.foodItem?.name || `Món #${item.foodItemId}`}</span>
                <p className="text-neutral-600 text-sm">x{item.quantity}</p>
              </div>
              <span className="text-neutral-900">{item.subtotal.toLocaleString()}đ</span>
            </div>
          ))}
        </div>
        
        <div className="border-t border-neutral-200 pt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-600">Tổng tiền hàng</span>
            <span>{(order.total - (order.deliveryFee || 0) + (order.discount || 0)).toLocaleString()}đ</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Phí giao hàng</span>
            <span>{(order.deliveryFee || 0).toLocaleString()}đ</span>
          </div>
          {(order.discount || 0) > 0 && (
            <div className="flex justify-between">
              <span className="text-neutral-600">Giảm giá</span>
              <span className="text-green-600">-{(order.discount || 0).toLocaleString()}đ</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-neutral-200 mt-2">
            <span className="font-semibold">Tổng thanh toán</span>
            <span className="font-semibold text-primary">{order.total.toLocaleString()}đ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
