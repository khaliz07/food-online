import React from "react";
import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutFooter from "@/components/checkout/CheckoutFooter";
import { useCart } from "@/context/CartContext";
import { useLocation } from "wouter";

const CheckoutPage: React.FC = () => {
  const { items } = useCart();
  const [, setLocation] = useLocation();
  
  // Redirect to home if cart is empty
  React.useEffect(() => {
    if (items.length === 0) {
      setLocation("/");
    }
  }, [items, setLocation]);
  
  if (items.length === 0) {
    return null;
  }
  
  return (
    <div className="flex-1 bg-neutral-100">
      <CheckoutHeader />
      <CheckoutForm />
      <CheckoutFooter />
    </div>
  );
};

export default CheckoutPage;
