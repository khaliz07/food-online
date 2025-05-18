import React, { useState } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Restaurant } from "@/lib/types";
import RestaurantHeader from "@/components/restaurant/RestaurantHeader";
import RestaurantMenu from "@/components/restaurant/RestaurantMenu";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/CartContext";

const RestaurantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const restaurantId = parseInt(id);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const { setRestaurant } = useCart();
  
  const { data: restaurant, isLoading } = useQuery<Restaurant>({
    queryKey: [`/api/restaurants/${restaurantId}`],
    onSuccess: (data) => {
      // Set restaurant in cart context
      setRestaurant(data);
    }
  });
  
  if (isLoading) {
    return (
      <div className="flex-1">
        <Skeleton className="h-48 w-full" />
        <div className="bg-white rounded-t-3xl -mt-6 relative z-10 px-4 pt-4 pb-2">
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-32 mb-3" />
          <div className="flex space-x-2 mt-3 overflow-x-auto scrollbar-hide">
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!restaurant) {
    return (
      <div className="flex-1 p-4 text-center py-20">
        <p className="text-neutral-600">Không tìm thấy thông tin nhà hàng</p>
      </div>
    );
  }
  
  return (
    <div className="flex-1">
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantMenu 
        restaurantId={restaurantId} 
        selectedCategory={selectedCategory} 
      />
    </div>
  );
};

export default RestaurantPage;
