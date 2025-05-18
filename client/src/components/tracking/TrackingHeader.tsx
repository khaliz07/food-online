import React from "react";
import { useLocation } from "wouter";
import Icon from "@/components/ui/icon";

const TrackingHeader: React.FC = () => {
  const [, setLocation] = useLocation();
  
  const handleBack = () => {
    setLocation("/");
  };
  
  return (
    <div className="sticky top-0 bg-white z-20 shadow-sm">
      <div className="flex items-center justify-between p-4">
        <button className="flex items-center" onClick={handleBack}>
          <Icon name="ri-arrow-left-s-line text-2xl" />
          <span className="font-poppins font-semibold text-lg ml-2">Theo dõi đơn hàng</span>
        </button>
        <button>
          <Icon name="ri-question-line text-xl" />
        </button>
      </div>
    </div>
  );
};

export default TrackingHeader;
