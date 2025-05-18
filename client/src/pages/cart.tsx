import React from "react";
import CartHeader from "@/components/cart/CartHeader";
import CartItems from "@/components/cart/CartItems";
import CartFooter from "@/components/cart/CartFooter";

const CartPage: React.FC = () => {
  return (
    <div className="flex-1">
      <CartHeader />
      <CartItems />
      <CartFooter />
    </div>
  );
};

export default CartPage;
