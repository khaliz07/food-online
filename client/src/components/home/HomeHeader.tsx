import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import Icon from "@/components/ui/icon";

interface HomeHeaderProps {
  username?: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ username = "Minh" }) => {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };
  
  return (
    <header className="px-4 pt-4 pb-2">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="font-poppins text-lg font-bold text-neutral-900">Xin chào, {username}!</h1>
          <p className="text-neutral-600 text-sm">Hôm nay bạn muốn ăn gì?</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full bg-neutral-100 text-neutral-700">
            <Icon name="ri-notification-3-line text-xl" />
          </button>
          <Link href="/profile">
            <button className="h-10 w-10 rounded-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                alt="User profile" 
                className="h-full w-full object-cover" 
              />
            </button>
          </Link>
        </div>
      </div>
      
      <form className="relative mb-4" onSubmit={handleSearch}>
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Icon name="ri-search-line text-neutral-500" />
        </div>
        <input 
          type="text" 
          placeholder="Tìm món ăn, cửa hàng..." 
          className="w-full py-3 pl-10 pr-4 rounded-xl bg-neutral-100 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </header>
  );
};

export default HomeHeader;
