import React, { createContext, useContext, useReducer, useEffect } from "react";
import { CartItem, Restaurant } from "@/lib/types";

interface CartState {
  items: CartItem[];
  restaurant: Restaurant | null;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "SET_RESTAURANT"; payload: Restaurant }
  | { type: "SET_DISCOUNT"; payload: number }
  | { type: "CLEAR_CART" };

interface CartContextType extends CartState {
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  setRestaurant: (restaurant: Restaurant) => void;
  setDiscount: (amount: number) => void;
  clearCart: () => void;
}

const initialState: CartState = {
  items: [],
  restaurant: null,
  subtotal: 0,
  deliveryFee: 0,
  discount: 0,
  total: 0,
};

const calculateTotals = (items: CartItem[], deliveryFee: number, discount: number): Pick<CartState, "subtotal" | "total"> => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = Math.max(0, subtotal + deliveryFee - discount);
  return { subtotal, total };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // If item already exists, update quantity
        newItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // Otherwise add new item
        newItems = [...state.items, action.payload];
      }
      
      const deliveryFee = newItems.length > 0 && state.restaurant ? (state.restaurant.deliveryFee || 0) : 0;
      const { subtotal, total } = calculateTotals(newItems, deliveryFee, state.discount);
      
      return {
        ...state,
        items: newItems,
        subtotal,
        deliveryFee,
        total,
      };
    }
    
    case "REMOVE_ITEM": {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const deliveryFee = newItems.length > 0 && state.restaurant ? (state.restaurant.deliveryFee || 0) : 0;
      const { subtotal, total } = calculateTotals(newItems, deliveryFee, state.discount);
      
      // If cart is empty, reset restaurant
      const restaurant = newItems.length > 0 ? state.restaurant : null;
      
      return {
        ...state,
        items: newItems,
        restaurant,
        subtotal,
        deliveryFee,
        total,
      };
    }
    
    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      
      // Remove item if quantity is 0
      if (quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_ITEM", payload: id });
      }
      
      const newItems = state.items.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
      
      const deliveryFee = newItems.length > 0 && state.restaurant ? (state.restaurant.deliveryFee || 0) : 0;
      const { subtotal, total } = calculateTotals(newItems, deliveryFee, state.discount);
      
      return {
        ...state,
        items: newItems,
        subtotal,
        deliveryFee,
        total,
      };
    }
    
    case "SET_RESTAURANT": {
      const deliveryFee = action.payload.deliveryFee || 0;
      const { subtotal, total } = calculateTotals(state.items, deliveryFee, state.discount);
      
      return {
        ...state,
        restaurant: action.payload,
        deliveryFee,
        subtotal,
        total,
      };
    }
    
    case "SET_DISCOUNT": {
      const { subtotal, total } = calculateTotals(state.items, state.deliveryFee, action.payload);
      
      return {
        ...state,
        discount: action.payload,
        total,
      };
    }
    
    case "CLEAR_CART": {
      return initialState;
    }
    
    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : initialState;
  });
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);
  
  // Actions
  const addItem = (item: CartItem) => {
    // Check if item is from a different restaurant
    if (state.restaurant && item.restaurantId !== state.restaurant.id && state.items.length > 0) {
      if (!window.confirm("Thêm món từ nhà hàng khác sẽ xóa giỏ hàng hiện tại. Bạn có muốn tiếp tục?")) {
        return;
      }
      // Clear cart before adding item
      dispatch({ type: "CLEAR_CART" });
    }
    
    dispatch({ type: "ADD_ITEM", payload: item });
  };
  
  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };
  
  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };
  
  const setRestaurant = (restaurant: Restaurant) => {
    dispatch({ type: "SET_RESTAURANT", payload: restaurant });
  };
  
  const setDiscount = (amount: number) => {
    dispatch({ type: "SET_DISCOUNT", payload: amount });
  };
  
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  
  return (
    <CartContext.Provider value={{
      ...state,
      addItem,
      removeItem,
      updateQuantity,
      setRestaurant,
      setDiscount,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
