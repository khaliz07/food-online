import React, { ReactNode } from "react";
import BottomNavigation from "./BottomNavigation";
import FloatingCartButton from "./FloatingCartButton";
import { useLocation } from "wouter";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [location] = useLocation();
  
  // Determine if we should show the floating cart button
  const showFloatingCart = location === "/" || location.startsWith("/restaurant");
  
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col pb-16 relative">
      {children}
      
      {showFloatingCart && <FloatingCartButton />}
      <BottomNavigation />
    </div>
  );
};

export default AppLayout;
