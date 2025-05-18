import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Icon from "@/components/ui/icon";
import { Order } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

const OrdersPage: React.FC = () => {
  // In a real app, this would use the authenticated user's ID
  const userId = 1; 
  
  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: [`/api/users/${userId}/orders`],
  });
  
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Filter orders based on active tab
  const filteredOrders = React.useMemo(() => {
    if (!orders) return [];
    
    if (activeTab === "all") {
      return orders;
    }
    
    return orders.filter(order => {
      if (activeTab === "active") {
        return ["pending", "confirmed", "preparing", "delivering"].includes(order.status);
      } else if (activeTab === "completed") {
        return order.status === "delivered";
      }
      return false;
    });
  }, [orders, activeTab]);
  
  // Format date
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };
  
  // Get status text and color
  const getStatusInfo = (status: string): { text: string, color: string } => {
    switch (status) {
      case "pending":
        return { text: "Chờ xác nhận", color: "bg-blue-50 text-blue-600" };
      case "confirmed":
        return { text: "Đã xác nhận", color: "bg-blue-50 text-blue-600" };
      case "preparing":
        return { text: "Đang chuẩn bị", color: "bg-amber-50 text-amber-600" };
      case "delivering":
        return { text: "Đang giao", color: "bg-primary/10 text-primary" };
      case "delivered":
        return { text: "Đã giao", color: "bg-green-50 text-green-600" };
      case "cancelled":
        return { text: "Đã hủy", color: "bg-red-50 text-red-600" };
      default:
        return { text: "Không xác định", color: "bg-neutral-100 text-neutral-600" };
    }
  };
  
  return (
    <div className="flex-1 bg-neutral-100">
      <div className="sticky top-0 bg-white z-20 shadow-sm px-4 py-3">
        <h1 className="font-poppins font-bold text-xl text-neutral-900 mb-3">Đơn hàng của tôi</h1>
        
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          <button 
            className={`${
              activeTab === "all" 
                ? "bg-primary text-white" 
                : "bg-neutral-100 text-neutral-800"
            } px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap`}
            onClick={() => setActiveTab("all")}
          >
            Tất cả
          </button>
          
          <button 
            className={`${
              activeTab === "active" 
                ? "bg-primary text-white" 
                : "bg-neutral-100 text-neutral-800"
            } px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap`}
            onClick={() => setActiveTab("active")}
          >
            Đang xử lý
          </button>
          
          <button 
            className={`${
              activeTab === "completed" 
                ? "bg-primary text-white" 
                : "bg-neutral-100 text-neutral-800"
            } px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap`}
            onClick={() => setActiveTab("completed")}
          >
            Đã hoàn thành
          </button>
        </div>
      </div>
      
      <div className="p-4">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              return (
                <Link key={order.id} href={`/tracking/${order.id}`}>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium">#{order.id.toString().padStart(8, '0')}</span>
                      <span className={`px-2 py-1 rounded text-sm ${statusInfo.color}`}>
                        {statusInfo.text}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
                      <div className="flex items-center">
                        <Icon name="ri-store-2-line text-primary text-lg mr-2" />
                        <h3 className="font-medium">
                          {order.restaurant?.name || `Nhà hàng #${order.restaurantId}`}
                        </h3>
                      </div>
                      <span className="text-neutral-600 text-sm">
                        {formatDate(order.createdAt)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-3">
                      <span className="text-neutral-600">Tổng thanh toán</span>
                      <span className="font-semibold text-primary">
                        {order.total.toLocaleString()}đ
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="text-neutral-400 mb-2">
              <Icon name="ri-file-list-line text-5xl" />
            </div>
            <p className="text-neutral-600">Bạn chưa có đơn hàng nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
