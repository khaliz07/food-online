import React, { useState } from "react";
import { useLocation } from "wouter";
import Icon from "@/components/ui/icon";
import { Restaurant } from "@/lib/types";

interface RestaurantHeaderProps {
  restaurant: Restaurant;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({ restaurant }) => {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  
  const categories = [
    "Tất cả",
    "Phở & Bún",
    "Cơm",
    "Món khai vị",
    "Đồ uống"
  ];
  
  const handleBack = () => {
    setLocation("/");
  };
  
  return (
    <div className="relative">
      <div className="h-48 bg-neutral-300">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="absolute top-4 left-4 z-10">
        <button 
          className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md"
          onClick={handleBack}
        >
          <Icon name="ri-arrow-left-s-line text-xl" />
        </button>
      </div>
      
      <div className="absolute right-4 top-4 flex space-x-2 z-10">
        <button className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md">
          <Icon name="ri-search-line text-xl" />
        </button>
        <button className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md">
          <Icon name="ri-heart-line text-xl" />
        </button>
      </div>
      
      <div className="bg-white rounded-t-3xl -mt-6 relative z-10 px-4 pt-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-poppins font-bold text-xl text-neutral-900">{restaurant.name}</h1>
            <p className="text-neutral-600 text-sm">{restaurant.category} • {restaurant.distance} km</p>
            <div className="flex items-center mt-1">
              {restaurant.rating && (
                <>
                  <div className="flex items-center text-amber-500">
                    <Icon name="ri-star-fill" />
                    <span className="ml-1 text-neutral-700 font-medium">{restaurant.rating.toFixed(1)}</span>
                  </div>
                  <span className="mx-2 text-neutral-300">|</span>
                </>
              )}
              
              <div className="flex items-center">
                <Icon name="ri-time-line text-neutral-500" />
                <span className="ml-1 text-neutral-700">{restaurant.deliveryTime}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-sm">
            <span>Mở cửa</span>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button 
              key={category}
              className={`${
                selectedCategory === category 
                  ? "bg-primary text-white" 
                  : "bg-neutral-100 text-neutral-800"
              } px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;
