import React, { ReactNode } from "react";
import { useLocation } from "wouter";
import Icon from "../ui/icon";

interface HeaderBarProps {
  title: string;
  showBackButton?: boolean;
  backTo?: string;
  rightElement?: ReactNode;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ 
  title,
  showBackButton = true,
  backTo,
  rightElement
}) => {
  const [, setLocation] = useLocation();
  
  const handleBack = () => {
    if (backTo) {
      setLocation(backTo);
    } else {
      window.history.back();
    }
  };
  
  return (
    <div className="sticky top-0 bg-white z-20 shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          {showBackButton && (
            <button className="mr-2" onClick={handleBack}>
              <Icon name="ri-arrow-left-s-line text-2xl" />
            </button>
          )}
          <span className="font-poppins font-semibold text-lg">{title}</span>
        </div>
        
        {rightElement}
      </div>
    </div>
  );
};

export default HeaderBar;
