import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  fullName: text("full_name"),
  phone: text("phone"),
  avatar: text("avatar"),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  phone: true,
  avatar: true,
  address: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Restaurant schema
export const restaurants = pgTable("restaurants", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  image: text("image"),
  address: text("address").notNull(),
  category: text("category").notNull(),
  rating: doublePrecision("rating").default(0),
  deliveryTime: text("delivery_time"),
  deliveryFee: integer("delivery_fee"),
  distance: doublePrecision("distance"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertRestaurantSchema = createInsertSchema(restaurants).pick({
  name: true,
  description: true,
  image: true,
  address: true,
  category: true,
  rating: true,
  deliveryTime: true,
  deliveryFee: true,
  distance: true,
});

export type InsertRestaurant = z.infer<typeof insertRestaurantSchema>;
export type Restaurant = typeof restaurants.$inferSelect;

// Food Item schema
export const foodItems = pgTable("food_items", {
  id: serial("id").primaryKey(),
  restaurantId: integer("restaurant_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  image: text("image"),
  price: integer("price").notNull(),
  category: text("category"),
  isPopular: boolean("is_popular").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertFoodItemSchema = createInsertSchema(foodItems).pick({
  restaurantId: true,
  name: true,
  description: true,
  image: true,
  price: true,
  category: true,
  isPopular: true,
});

export type InsertFoodItem = z.infer<typeof insertFoodItemSchema>;
export type FoodItem = typeof foodItems.$inferSelect;

// Order schema
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  restaurantId: integer("restaurant_id").notNull(),
  total: integer("total").notNull(),
  deliveryFee: integer("delivery_fee"),
  discount: integer("discount").default(0),
  status: text("status").default("pending"),
  paymentMethod: text("payment_method").default("cash"),
  address: text("address").notNull(),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  userId: true,
  restaurantId: true,
  total: true,
  deliveryFee: true,
  discount: true,
  status: true,
  paymentMethod: true,
  address: true,
  note: true,
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Order Item schema
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  foodItemId: integer("food_item_id").notNull(),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
  subtotal: integer("subtotal").notNull(),
});

export const insertOrderItemSchema = createInsertSchema(orderItems).pick({
  orderId: true,
  foodItemId: true,
  quantity: true,
  price: true,
  subtotal: true,
});

export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;

// Category schema
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon"),
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  icon: true,
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// Promotion schema
export const promotions = pgTable("promotions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image"),
  code: text("code").notNull(),
  discount: integer("discount").notNull(),
  expiryDate: timestamp("expiry_date"),
});

export const insertPromotionSchema = createInsertSchema(promotions).pick({
  title: true,
  description: true,
  image: true,
  code: true,
  discount: true,
  expiryDate: true,
});

export type InsertPromotion = z.infer<typeof insertPromotionSchema>;
export type Promotion = typeof promotions.$inferSelect;
