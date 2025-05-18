import React from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Restaurant } from "@/lib/types";
import Icon from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";

const NearbyRestaurants: React.FC = () => {
  const { data: restaurants, isLoading } = useQuery<Restaurant[]>({
    queryKey: ["/api/restaurants/nearby"],
  });
  
  if (isLoading) {
    return (
      <div className="mb-6 px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-poppins font-semibold text-neutral-900">Gần bạn</h2>
          <span className="text-sm text-primary font-medium">Xem tất cả</span>
        </div>
        <div className="space-y-4">
          <Skeleton className="w-full h-48 rounded-xl" />
          <Skeleton className="w-full h-48 rounded-xl" />
        </div>
      </div>
    );
  }
  
  // No restaurants available
  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="mb-6 px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-poppins font-semibold text-neutral-900">Gần bạn</h2>
          <Link href="/search">
            <button className="text-sm text-primary font-medium">Xem tất cả</button>
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-neutral-600">Không tìm thấy nhà hàng gần bạn</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mb-6 px-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-poppins font-semibold text-neutral-900">Gần bạn</h2>
        <Link href="/search">
          <button className="text-sm text-primary font-medium">Xem tất cả</button>
        </Link>
      </div>
      
      <div className="space-y-4">
        {restaurants.map((restaurant) => (
          <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200">
              <img 
                src={restaurant.image} 
                alt={restaurant.name} 
                className="w-full h-48 object-cover" 
              />
              
              <div className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-poppins font-semibold text-neutral-900">{restaurant.name}</h3>
                    <p className="text-neutral-600 text-sm">{restaurant.category} • {restaurant.distance} km</p>
                  </div>
                  
                  {restaurant.rating && (
                    <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-md text-sm">
                      <Icon name="ri-star-fill mr-1" />
                      <span>{restaurant.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center mt-2 text-sm">
                  <div className="flex items-center text-neutral-600 mr-4">
                    <Icon name="ri-time-line mr-1" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  
                  <div className="flex items-center text-neutral-600">
                    <Icon name="ri-motorbike-line mr-1" />
                    <span>{(restaurant.deliveryFee || 0).toLocaleString()}đ</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NearbyRestaurants;
