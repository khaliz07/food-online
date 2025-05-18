import React from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Promotion } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

const PromoSlider: React.FC = () => {
  const { data: promotions, isLoading } = useQuery<Promotion[]>({
    queryKey: ["/api/promotions"],
  });
  
  if (isLoading) {
    return (
      <div className="mb-6 px-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-poppins font-semibold text-neutral-900">Khuyến mãi</h2>
          <span className="text-sm text-primary font-medium">Xem tất cả</span>
        </div>
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
          <Skeleton className="min-w-[280px] h-36 rounded-xl" />
          <Skeleton className="min-w-[280px] h-36 rounded-xl" />
        </div>
      </div>
    );
  }
  
  // No promotions available
  if (!promotions || promotions.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-6 px-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-poppins font-semibold text-neutral-900">Khuyến mãi</h2>
        <Link href="/promotions">
          <button className="text-sm text-primary font-medium">Xem tất cả</button>
        </Link>
      </div>
      
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
        {promotions.map((promo) => (
          <div 
            key={promo.id}
            className={`min-w-[280px] h-36 bg-primary rounded-xl overflow-hidden relative ${
              promo.id % 2 === 0 ? "bg-secondary" : "bg-primary"
            }`}
          >
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <div className="text-white">
                <h3 className="font-poppins font-bold text-lg">{promo.title}</h3>
                <p className="text-sm text-white/90">{promo.description}</p>
              </div>
              <button 
                className={`bg-white ${
                  promo.id % 2 === 0 ? "text-secondary" : "text-primary"
                } font-medium rounded-lg py-2 px-4 self-start text-sm`}
              >
                Sử dụng ngay
              </button>
            </div>
            <div className="absolute right-0 bottom-0">
              <img 
                src={promo.image} 
                alt={promo.title} 
                className="h-32 object-cover" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoSlider;
