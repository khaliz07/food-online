import React from "react";
import { Link, useLocation } from "wouter";
import Icon from "../ui/icon";

const BottomNavigation: React.FC = () => {
  const [location] = useLocation();
  
  const isActive = (path: string) => {
    return location === path ? "text-primary" : "text-neutral-500";
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-50">
      <div className="flex justify-around items-center py-2 max-w-md mx-auto">
        <Link href="/">
          <button className={`flex flex-col items-center p-2 ${isActive("/")}`}>
            <Icon name={`ri-home-${location === "/" ? "5-fill" : "line"} text-xl`} />
            <span className="text-xs mt-1">Trang chủ</span>
          </button>
        </Link>
        
        <Link href="/search">
          <button className={`flex flex-col items-center p-2 ${isActive("/search")}`}>
            <Icon name="ri-search-line text-xl" />
            <span className="text-xs mt-1">Tìm kiếm</span>
          </button>
        </Link>
        
        <Link href="/orders">
          <button className={`flex flex-col items-center p-2 ${isActive("/orders")}`}>
            <Icon name="ri-file-list-line text-xl" />
            <span className="text-xs mt-1">Đơn hàng</span>
          </button>
        </Link>
        
        <Link href="/profile">
          <button className={`flex flex-col items-center p-2 ${isActive("/profile")}`}>
            <Icon name="ri-user-line text-xl" />
            <span className="text-xs mt-1">Cá nhân</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
