import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertOrderSchema, insertOrderItemSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // User routes
  app.get("/api/user/:id", async (req, res) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Don't send password
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });
  
  app.post("/api/auth/login", async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    
    const user = await storage.getUserByUsername(username);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // In a real app, we'd set up sessions and return a token
    // For now, we'll just return the user without password
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });
  
  // Restaurant routes
  app.get("/api/restaurants", async (req, res) => {
    const restaurants = await storage.getRestaurants();
    res.json(restaurants);
  });
  
  app.get("/api/restaurants/nearby", async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const restaurants = await storage.getNearbyRestaurants(limit);
    res.json(restaurants);
  });
  
  app.get("/api/restaurants/:id", async (req, res) => {
    const restaurantId = parseInt(req.params.id);
    if (isNaN(restaurantId)) {
      return res.status(400).json({ message: "Invalid restaurant ID" });
    }
    
    const restaurant = await storage.getRestaurantById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    
    res.json(restaurant);
  });
  
  // Food Item routes
  app.get("/api/restaurants/:id/food-items", async (req, res) => {
    const restaurantId = parseInt(req.params.id);
    if (isNaN(restaurantId)) {
      return res.status(400).json({ message: "Invalid restaurant ID" });
    }
    
    const foodItems = await storage.getFoodItems(restaurantId);
    res.json(foodItems);
  });
  
  app.get("/api/food-items/popular", async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const foodItems = await storage.getPopularFoodItems(limit);
    res.json(foodItems);
  });
  
  app.get("/api/food-items/:id", async (req, res) => {
    const foodItemId = parseInt(req.params.id);
    if (isNaN(foodItemId)) {
      return res.status(400).json({ message: "Invalid food item ID" });
    }
    
    const foodItem = await storage.getFoodItemById(foodItemId);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }
    
    res.json(foodItem);
  });
  
  // Category routes
  app.get("/api/categories", async (req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });
  
  // Promotion routes
  app.get("/api/promotions", async (req, res) => {
    const promotions = await storage.getPromotions();
    res.json(promotions);
  });
  
  app.get("/api/promotions/:code", async (req, res) => {
    const code = req.params.code;
    
    const promotion = await storage.getPromotionByCode(code);
    if (!promotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }
    
    res.json(promotion);
  });
  
  // Order routes
  app.get("/api/users/:userId/orders", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const orders = await storage.getOrders(userId);
    res.json(orders);
  });
  
  app.get("/api/orders/:id", async (req, res) => {
    const orderId = parseInt(req.params.id);
    if (isNaN(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }
    
    const order = await storage.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    // Get order items
    const orderItems = await storage.getOrderItems(orderId);
    
    res.json({ ...order, items: orderItems });
  });
  
  app.post("/api/orders", async (req, res) => {
    try {
      // Validate order data
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      
      // Process order items
      if (req.body.items && Array.isArray(req.body.items)) {
        for (const item of req.body.items) {
          const orderItemData = insertOrderItemSchema.parse({
            ...item,
            orderId: order.id
          });
          await storage.createOrderItem(orderItemData);
        }
      }
      
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create order" });
    }
  });
  
  app.patch("/api/orders/:id/status", async (req, res) => {
    const orderId = parseInt(req.params.id);
    if (isNaN(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }
    
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }
    
    const updatedOrder = await storage.updateOrderStatus(orderId, status);
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    res.json(updatedOrder);
  });

  const httpServer = createServer(app);
  return httpServer;
}
