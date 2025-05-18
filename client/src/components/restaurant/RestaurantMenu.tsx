import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { FoodItem } from "@/lib/types";
import Icon from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/CartContext";

interface RestaurantMenuProps {
  restaurantId: number;
  selectedCategory?: string;
}

const RestaurantMenu: React.FC<RestaurantMenuProps> = ({ 
  restaurantId,
  selectedCategory = "Tất cả" 
}) => {
  const { data: foodItems, isLoading } = useQuery<FoodItem[]>({
    queryKey: [`/api/restaurants/${restaurantId}/food-items`],
  });
  
  const { addItem } = useCart();
  
  const filteredItems = useMemo(() => {
    if (!foodItems) return [];
    
    if (selectedCategory === "Tất cả") {
      return foodItems;
    }
    
    return foodItems.filter(item => item.category === selectedCategory);
  }, [foodItems, selectedCategory]);
  
  // Group items by category
  const groupedItems = useMemo(() => {
    if (!filteredItems) return {};
    
    return filteredItems.reduce((acc, item) => {
      const category = item.category || "Khác";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as Record<string, FoodItem[]>);
  }, [filteredItems]);
  
  const handleAddToCart = (food: FoodItem) => {
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
      <div className="px-4 pb-4">
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="space-y-3">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
      </div>
    );
  }
  
  if (!foodItems || foodItems.length === 0) {
    return (
      <div className="px-4 pb-4 text-center py-10">
        <p className="text-neutral-600">Không có món ăn nào trong danh mục này</p>
      </div>
    );
  }
  
  return (
    <div className="px-4 pb-4">
      {Object.entries(groupedItems).map(([category, items]) => (
        <div key={category}>
          <div className="mt-4 mb-3">
            <h2 className="font-poppins font-semibold text-neutral-900">{category}</h2>
          </div>
          
          <div className="space-y-3">
            {items.map((food) => (
              <div key={food.id} className="flex bg-white rounded-xl overflow-hidden border border-neutral-200 shadow-sm">
                <div className="w-24 h-24 flex-shrink-0">
                  <img 
                    src={food.image} 
                    alt={food.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div className="flex-1 p-3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-neutral-900">{food.name}</h3>
                    <p className="text-neutral-600 text-sm line-clamp-2">{food.description}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-semibold">{food.price.toLocaleString()}đ</span>
                    <button 
                      className="bg-primary text-white rounded-full w-7 h-7 flex items-center justify-center"
                      onClick={() => handleAddToCart(food)}
                    >
                      <Icon name="ri-add-line" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;
