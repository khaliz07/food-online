import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Icon from "@/components/ui/icon";
import { Restaurant, FoodItem, Category } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/CartContext";

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [location] = useLocation();
  const { addItem } = useCart();
  
  // Parse search params from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get("q");
    const categoryParam = params.get("category");
    
    if (queryParam) {
      setSearchQuery(queryParam);
    }
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location]);
  
  // Fetch categories
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  // Fetch restaurants
  const { data: restaurants, isLoading: isLoadingRestaurants } = useQuery<Restaurant[]>({
    queryKey: ["/api/restaurants"],
  });
  
  // Fetch food items
  const { data: popularFoodItems } = useQuery<FoodItem[]>({
    queryKey: ["/api/food-items/popular"],
  });
  
  // Filter results based on search query and selected category
  const filteredRestaurants = React.useMemo(() => {
    if (!restaurants) return [];
    
    return restaurants.filter(restaurant => {
      const matchesQuery = !searchQuery || 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (restaurant.description && restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = !selectedCategory || 
        restaurant.category === selectedCategory;
      
      return matchesQuery && matchesCategory;
    });
  }, [restaurants, searchQuery, selectedCategory]);
  
  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  // Handle add to cart
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
  
  return (
    <div className="flex-1 bg-neutral-100">
      <div className="sticky top-0 bg-white z-20 shadow-sm px-4 py-3">
        <form className="relative mb-3" onSubmit={handleSearch}>
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Icon name="ri-search-line text-neutral-500" />
          </div>
          <input 
            type="text" 
            placeholder="Tìm món ăn, cửa hàng..." 
            className="w-full py-3 pl-10 pr-4 rounded-xl bg-neutral-100 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          <button 
            className={`${
              !selectedCategory 
                ? "bg-primary text-white" 
                : "bg-neutral-100 text-neutral-800"
            } px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap`}
            onClick={() => setSelectedCategory(null)}
          >
            Tất cả
          </button>
          
          {categories?.map((category) => (
            <button 
              key={category.id}
              className={`${
                selectedCategory === category.name 
                  ? "bg-primary text-white" 
                  : "bg-neutral-100 text-neutral-800"
              } px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        {searchQuery && (
          <h2 className="font-poppins font-semibold text-neutral-900 mb-3">
            Kết quả tìm kiếm cho "{searchQuery}"
          </h2>
        )}
        
        {isLoadingRestaurants ? (
          <div className="space-y-4">
            <Skeleton className="h-48 rounded-xl" />
            <Skeleton className="h-48 rounded-xl" />
          </div>
        ) : filteredRestaurants.length > 0 ? (
          <div>
            <h3 className="font-medium mb-3">Nhà hàng ({filteredRestaurants.length})</h3>
            <div className="space-y-4 mb-6">
              {filteredRestaurants.map((restaurant) => (
                <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name} 
                      className="w-full h-36 object-cover" 
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
        ) : (
          <div className="text-center py-8">
            <div className="text-neutral-400 mb-2">
              <Icon name="ri-search-line text-5xl" />
            </div>
            <p className="text-neutral-600">Không tìm thấy kết quả nào phù hợp</p>
          </div>
        )}
        
        {/* Popular items section only if there's no search query */}
        {!searchQuery && popularFoodItems && popularFoodItems.length > 0 && (
          <div>
            <h3 className="font-medium mb-3 mt-4">Món ăn phổ biến</h3>
            <div className="grid grid-cols-2 gap-4">
              {popularFoodItems.map((food) => (
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
        )}
      </div>
    </div>
  );
};

export default SearchPage;
