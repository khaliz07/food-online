export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurantId: number;
};

export type Restaurant = {
  id: number;
  name: string;
  description?: string;
  image: string;
  address: string;
  category: string;
  rating?: number;
  deliveryTime?: string;
  deliveryFee?: number;
  distance?: number;
  createdAt?: Date;
};

export type FoodItem = {
  id: number;
  restaurantId: number;
  name: string;
  description?: string;
  image: string;
  price: number;
  category?: string;
  isPopular?: boolean;
  createdAt?: Date;
};

export type Category = {
  id: number;
  name: string;
  icon?: string;
};

export type Promotion = {
  id: number;
  title: string;
  description?: string;
  image: string;
  code: string;
  discount: number;
  expiryDate?: Date;
};

export type Order = {
  id: number;
  userId: number;
  restaurantId: number;
  restaurant?: Restaurant;
  total: number;
  deliveryFee?: number;
  discount?: number;
  status: string;
  paymentMethod: string;
  address: string;
  note?: string;
  createdAt: Date;
  items?: OrderItem[];
};

export type OrderItem = {
  id: number;
  orderId: number;
  foodItemId: number;
  foodItem?: FoodItem;
  quantity: number;
  price: number;
  subtotal: number;
};

export type User = {
  id: number;
  username: string;
  email?: string;
  fullName?: string;
  phone?: string;
  avatar?: string;
  address?: string;
  createdAt?: Date;
};
