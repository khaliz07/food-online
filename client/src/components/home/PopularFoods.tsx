import React from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { FoodItem } from "@/lib/types";
import Icon from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/CartContext";

const PopularFoods: React.FC = () => {
  const { data: foodItems, isLoading } = useQuery<FoodItem[]>({
    queryKey: ["/api/food-items/popular"],
  });
  
  const { addItem } = useCart();
  
  const handleAddToCart = (food: FoodItem, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    addItem({
      id: food.id,
      name: food.name,
      price: food.price,
      quantity: 1,
      image: food.image,
      restaurantId: food.restaurantId
    });
  };
  
  if (isLoading) {
    return (
      <div className="mb-6 px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-poppins font-semibold text-neutral-900">Món phổ biến</h2>
          <span className="text-sm text-primary font-medium">Xem tất cả</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-52 rounded-xl" />
          <Skeleton className="h-52 rounded-xl" />
          <Skeleton className="h-52 rounded-xl" />
          <Skeleton className="h-52 rounded-xl" />
        </div>
      </div>
    );
  }
  
  // No food items available
  if (!foodItems || foodItems.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-6 px-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-poppins font-semibold text-neutral-900">Món phổ biến</h2>
        <Link href="/search">
          <button className="text-sm text-primary font-medium">Xem tất cả</button>
        </Link>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {foodItems.map((food) => (
          <Link key={food.id} href={`/restaurant/${food.restaurantId}?foodId=${food.id}`}>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200">
              <div className="relative h-32">
                <img 
                  src={food.image} 
                  alt={food.name} 
                  className="w-full h-full object-cover" 
                />
                <button className="absolute right-2 top-2 bg-white rounded-full p-1.5 shadow-md">
                  <Icon name="ri-heart-line text-neutral-500" />
                </button>
              </div>
              
              <div className="p-2">
                <h3 className="font-medium text-neutral-900 truncate">{food.name}</h3>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-primary font-semibold">{food.price.toLocaleString()}đ</span>
                  <button 
                    className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={(e) => handleAddToCart(food, e)}
                  >
                    <Icon name="ri-add-line" />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularFoods;
