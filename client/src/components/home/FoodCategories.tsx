import React from "react";
import { Link } from "wouter";
import Icon from "@/components/ui/icon";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/lib/types";

const FoodCategories: React.FC = () => {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  // Fallback categories if API fails or while loading
  const fallbackCategories = [
    { id: 1, name: "Tất cả", icon: "ri-restaurant-line" },
    { id: 2, name: "Bánh ngọt", icon: "ri-cake-3-line" },
    { id: 3, name: "Đồ uống", icon: "ri-cup-line" },
    { id: 4, name: "Fast food", icon: "ri-sandwich-line" },
    { id: 5, name: "Cơm", icon: "ri-bowl-line" },
    { id: 6, name: "Healthy", icon: "ri-award-line" }
  ];
  
  const displayCategories = categories || fallbackCategories;
  
  // Map category icons to colors
  const iconColors: Record<string, string> = {
    "ri-restaurant-line": "bg-primary/10 text-primary",
    "ri-cake-3-line": "bg-secondary/10 text-secondary",
    "ri-cup-line": "bg-accent/10 text-accent",
    "ri-sandwich-line": "bg-red-500/10 text-red-500",
    "ri-bowl-line": "bg-blue-500/10 text-blue-500",
    "ri-award-line": "bg-green-500/10 text-green-500"
  };
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-poppins font-semibold text-neutral-900">Danh mục</h2>
        <Link href="/search">
          <button className="text-sm text-primary font-medium">Xem tất cả</button>
        </Link>
      </div>
      
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide py-2">
        {displayCategories.map((category) => (
          <Link key={category.id} href={`/search?category=${category.name}`}>
            <div className="flex flex-col items-center space-y-1 min-w-[60px]">
              <div className={`w-14 h-14 ${iconColors[category.icon || ""] || "bg-primary/10 text-primary"} rounded-full flex items-center justify-center`}>
                <Icon name={`${category.icon || "ri-restaurant-line"} text-xl`} />
              </div>
              <span className="text-xs text-neutral-700">{category.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FoodCategories;
