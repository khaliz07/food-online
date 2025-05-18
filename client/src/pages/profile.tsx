import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import Icon from "@/components/ui/icon";
import { User } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/CartContext";

const ProfilePage: React.FC = () => {
  const [, setLocation] = useLocation();
  const { clearCart } = useCart();
  
  // In a real app, this would use the authenticated user's ID
  const userId = 1;
  
  const { data: user, isLoading } = useQuery<User>({
    queryKey: [`/api/user/${userId}`],
  });
  
  const handleLogout = () => {
    if (window.confirm("Bạn có chắc muốn đăng xuất?")) {
      // In a real app, this would call a logout API
      clearCart();
      setLocation("/");
    }
  };
  
  return (
    <div className="flex-1 bg-neutral-100">
      <div className="bg-primary text-white pt-10 pb-6 px-4 rounded-b-3xl">
        <h1 className="font-poppins font-bold text-xl mb-6">Tài khoản</h1>
        
        {isLoading ? (
          <div className="flex items-center">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="ml-4">
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <img 
                src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"} 
                alt="Profile" 
                className="h-full w-full object-cover" 
              />
            </div>
            <div className="ml-4">
              <h2 className="font-semibold text-lg">{user?.fullName || user?.username || "User"}</h2>
              <p className="text-white/90">{user?.email || "No email"}</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200 mb-4">
          <div className="p-4 border-b border-neutral-200">
            <h3 className="font-medium">Thông tin cá nhân</h3>
          </div>
          
          <div className="divide-y divide-neutral-200">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Icon name="ri-user-line text-primary mr-3" />
                <span>Hồ sơ</span>
              </div>
              <Icon name="ri-arrow-right-s-line text-neutral-400" />
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Icon name="ri-map-pin-line text-primary mr-3" />
                <span>Địa chỉ của tôi</span>
              </div>
              <Icon name="ri-arrow-right-s-line text-neutral-400" />
            </div>
            
            <Link href="/orders">
              <div className="flex items-center justify-between p-4 cursor-pointer">
                <div className="flex items-center">
                  <Icon name="ri-file-list-line text-primary mr-3" />
                  <span>Lịch sử đơn hàng</span>
                </div>
                <Icon name="ri-arrow-right-s-line text-neutral-400" />
              </div>
            </Link>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Icon name="ri-coupon-line text-primary mr-3" />
                <span>Mã giảm giá</span>
              </div>
              <Icon name="ri-arrow-right-s-line text-neutral-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200 mb-4">
          <div className="p-4 border-b border-neutral-200">
            <h3 className="font-medium">Cài đặt</h3>
          </div>
          
          <div className="divide-y divide-neutral-200">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Icon name="ri-notification-line text-primary mr-3" />
                <span>Thông báo</span>
              </div>
              <Icon name="ri-arrow-right-s-line text-neutral-400" />
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Icon name="ri-lock-line text-primary mr-3" />
                <span>Bảo mật</span>
              </div>
              <Icon name="ri-arrow-right-s-line text-neutral-400" />
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Icon name="ri-global-line text-primary mr-3" />
                <span>Ngôn ngữ</span>
              </div>
              <span className="text-neutral-500 text-sm">Tiếng Việt</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200 mb-4">
          <div className="divide-y divide-neutral-200">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Icon name="ri-customer-service-line text-primary mr-3" />
                <span>Trung tâm hỗ trợ</span>
              </div>
              <Icon name="ri-arrow-right-s-line text-neutral-400" />
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Icon name="ri-information-line text-primary mr-3" />
                <span>Về chúng tôi</span>
              </div>
              <Icon name="ri-arrow-right-s-line text-neutral-400" />
            </div>
            
            <button 
              className="flex items-center justify-between w-full p-4 text-left"
              onClick={handleLogout}
            >
              <div className="flex items-center">
                <Icon name="ri-logout-box-line text-red-500 mr-3" />
                <span className="text-red-500">Đăng xuất</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
