import { 
  User, InsertUser, 
  Restaurant, InsertRestaurant,
  FoodItem, InsertFoodItem,
  Order, InsertOrder,
  OrderItem, InsertOrderItem,
  Category, InsertCategory,
  Promotion, InsertPromotion
} from "@shared/schema";

// Interfaces for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  
  // Restaurant operations
  getRestaurants(): Promise<Restaurant[]>;
  getRestaurantById(id: number): Promise<Restaurant | undefined>;
  getNearbyRestaurants(limit?: number): Promise<Restaurant[]>;
  createRestaurant(restaurant: InsertRestaurant): Promise<Restaurant>;
  
  // Food Item operations
  getFoodItems(restaurantId: number): Promise<FoodItem[]>;
  getFoodItemById(id: number): Promise<FoodItem | undefined>;
  getFoodItemsByCategory(category: string): Promise<FoodItem[]>;
  getPopularFoodItems(limit?: number): Promise<FoodItem[]>;
  createFoodItem(foodItem: InsertFoodItem): Promise<FoodItem>;
  
  // Order operations
  getOrders(userId: number): Promise<Order[]>;
  getOrderById(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  
  // Order Item operations
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Promotion operations
  getPromotions(): Promise<Promotion[]>;
  getPromotionByCode(code: string): Promise<Promotion | undefined>;
  createPromotion(promotion: InsertPromotion): Promise<Promotion>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private restaurants: Map<number, Restaurant>;
  private foodItems: Map<number, FoodItem>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private categories: Map<number, Category>;
  private promotions: Map<number, Promotion>;
  
  private userId: number;
  private restaurantId: number;
  private foodItemId: number;
  private orderId: number;
  private orderItemId: number;
  private categoryId: number;
  private promotionId: number;

  constructor() {
    this.users = new Map();
    this.restaurants = new Map();
    this.foodItems = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.categories = new Map();
    this.promotions = new Map();
    
    this.userId = 1;
    this.restaurantId = 1;
    this.foodItemId = 1;
    this.orderId = 1;
    this.orderItemId = 1;
    this.categoryId = 1;
    this.promotionId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const existingUser = this.users.get(id);
    if (!existingUser) return undefined;
    
    const updatedUser = { ...existingUser, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Restaurant operations
  async getRestaurants(): Promise<Restaurant[]> {
    return Array.from(this.restaurants.values());
  }

  async getRestaurantById(id: number): Promise<Restaurant | undefined> {
    return this.restaurants.get(id);
  }

  async getNearbyRestaurants(limit: number = 10): Promise<Restaurant[]> {
    // In a real implementation, this would filter by location proximity
    return Array.from(this.restaurants.values())
      .sort((a, b) => (a.distance || 999) - (b.distance || 999))
      .slice(0, limit);
  }

  async createRestaurant(insertRestaurant: InsertRestaurant): Promise<Restaurant> {
    const id = this.restaurantId++;
    const restaurant: Restaurant = { ...insertRestaurant, id, createdAt: new Date() };
    this.restaurants.set(id, restaurant);
    return restaurant;
  }

  // Food Item operations
  async getFoodItems(restaurantId: number): Promise<FoodItem[]> {
    return Array.from(this.foodItems.values()).filter(
      (item) => item.restaurantId === restaurantId
    );
  }

  async getFoodItemById(id: number): Promise<FoodItem | undefined> {
    return this.foodItems.get(id);
  }

  async getFoodItemsByCategory(category: string): Promise<FoodItem[]> {
    return Array.from(this.foodItems.values()).filter(
      (item) => item.category === category
    );
  }

  async getPopularFoodItems(limit: number = 10): Promise<FoodItem[]> {
    return Array.from(this.foodItems.values())
      .filter(item => item.isPopular)
      .slice(0, limit);
  }

  async createFoodItem(insertFoodItem: InsertFoodItem): Promise<FoodItem> {
    const id = this.foodItemId++;
    const foodItem: FoodItem = { ...insertFoodItem, id, createdAt: new Date() };
    this.foodItems.set(id, foodItem);
    return foodItem;
  }

  // Order operations
  async getOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId
    );
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderId++;
    const order: Order = { ...insertOrder, id, createdAt: new Date() };
    this.orders.set(id, order);
    return order;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const existingOrder = this.orders.get(id);
    if (!existingOrder) return undefined;
    
    const updatedOrder = { ...existingOrder, status };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  // Order Item operations
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(
      (item) => item.orderId === orderId
    );
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.orderItemId++;
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Promotion operations
  async getPromotions(): Promise<Promotion[]> {
    return Array.from(this.promotions.values());
  }

  async getPromotionByCode(code: string): Promise<Promotion | undefined> {
    return Array.from(this.promotions.values()).find(
      (promo) => promo.code === code
    );
  }

  async createPromotion(insertPromotion: InsertPromotion): Promise<Promotion> {
    const id = this.promotionId++;
    const promotion: Promotion = { ...insertPromotion, id };
    this.promotions.set(id, promotion);
    return promotion;
  }

  private initializeData() {
    // Create sample categories
    const categories = [
      { name: "Tất cả", icon: "ri-restaurant-line" },
      { name: "Bánh ngọt", icon: "ri-cake-3-line" },
      { name: "Đồ uống", icon: "ri-cup-line" },
      { name: "Fast food", icon: "ri-sandwich-line" },
      { name: "Cơm", icon: "ri-bowl-line" },
      { name: "Healthy", icon: "ri-award-line" }
    ];
    
    categories.forEach(cat => {
      this.createCategory({ name: cat.name, icon: cat.icon });
    });

    // Create sample restaurants
    const restaurants = [
      {
        name: "Nhà hàng Phở Việt",
        description: "Ẩm thực Việt Nam truyền thống với các món phở, bún, và nem cuốn.",
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        address: "123 Nguyễn Huệ, Quận 1, TP. HCM",
        category: "Món Việt",
        rating: 4.8,
        deliveryTime: "15-25 phút",
        deliveryFee: 15000,
        distance: 0.8
      },
      {
        name: "The Coffee House",
        description: "Quán cà phê và bánh ngọt phong cách hiện đại.",
        image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        address: "45 Trần Hưng Đạo, Quận 1, TP. HCM",
        category: "Cà phê",
        rating: 4.6,
        deliveryTime: "10-20 phút",
        deliveryFee: 20000,
        distance: 1.2
      }
    ];
    
    const restaurantIds: number[] = [];
    
    for (const restaurant of restaurants) {
      const created = this.createRestaurant(restaurant as any).then(r => {
        restaurantIds.push(r.id);
        return r;
      });
    }

    // Create sample food items
    setTimeout(() => {
      if (restaurantIds.length > 0) {
        const foodItems = [
          {
            restaurantId: restaurantIds[0],
            name: "Phở bò đặc biệt",
            description: "Phở với nhiều loại thịt bò: tái, nạm, gầu, gân",
            image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
            price: 85000,
            category: "Phở & Bún",
            isPopular: true
          },
          {
            restaurantId: restaurantIds[0],
            name: "Phở bò tái",
            description: "Phở với thịt bò tái mỏng",
            image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
            price: 75000,
            category: "Phở & Bún",
            isPopular: true
          },
          {
            restaurantId: restaurantIds[0],
            name: "Bún bò Huế",
            description: "Bún bò cay Huế với gia vị đặc trưng",
            image: "https://pixabay.com/get/gebb9f09860858141fb441d975d758da546e9fab4ebd8203dde8de21c64f8230127ade304531884c0ebbea5db7310f503a11d1426b7c2e1c155f762b452c0a4f6_1280.jpg",
            price: 85000,
            category: "Phở & Bún",
            isPopular: true
          },
          {
            restaurantId: restaurantIds[0],
            name: "Gỏi cuốn tôm thịt",
            description: "Bánh tráng cuốn với tôm, thịt heo, bún và rau sống",
            image: "https://pixabay.com/get/gec110ba8bf1d87f9996e0f9f1a1d71f5def8bb8e901b99af6085bb3e113375c11d63118ec59c76fe2c41d5c3fcf05805afee887f1534ba64a0c72607bebe1c16_1280.jpg",
            price: 65000,
            category: "Món khai vị",
            isPopular: false
          },
          {
            restaurantId: restaurantIds[0],
            name: "Gỏi gà xé phay",
            description: "Gỏi gà với bắp cải, cà rốt, rau răm và đậu phộng",
            image: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
            price: 75000,
            category: "Món khai vị",
            isPopular: false
          },
          {
            restaurantId: restaurantIds[1],
            name: "Cà phê sữa đá",
            description: "Cà phê truyền thống pha với sữa đặc và đá",
            image: "https://pixabay.com/get/g8ec4f07d845868c1b4676f807c13cfa3aeee4a317af2fc6fee7e54aa816eff73fbf4f754fb1148401d95dcb832ef1480a963a7735436e7cb662e13e6ed4ec0ca_1280.jpg",
            price: 35000,
            category: "Đồ uống",
            isPopular: true
          },
          {
            restaurantId: restaurantIds[1],
            name: "Bánh mì thịt",
            description: "Bánh mì với thịt, pate, dưa chuột, và rau thơm",
            image: "https://pixabay.com/get/g3b356c489a5e9a2c78506532ebc721a8b406549e37eefe41ab7ef37bfd7d5502275395dd3fd5c15ca78cd893cd188ce8c9afdbdf593111c22ec3e5c323ce19f0_1280.jpg",
            price: 30000,
            category: "Bánh",
            isPopular: true
          }
        ];
        
        for (const foodItem of foodItems) {
          this.createFoodItem(foodItem as any);
        }
      }
    }, 100);

    // Create sample promotions
    const promotions = [
      {
        title: "Giảm 50K",
        description: "Cho đơn hàng đầu tiên",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
        code: "WELCOME50",
        discount: 50000,
        expiryDate: new Date(new Date().setDate(new Date().getDate() + 30))
      },
      {
        title: "Free Ship",
        description: "Cho đơn buổi trưa",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
        code: "FREESHIP",
        discount: 20000,
        expiryDate: new Date(new Date().setDate(new Date().getDate() + 15))
      }
    ];
    
    for (const promotion of promotions) {
      this.createPromotion(promotion as any);
    }

    // Create a sample user
    this.createUser({
      username: "user",
      password: "password",
      email: "user@example.com",
      fullName: "Minh Nguyễn",
      phone: "0901234567",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      address: "KTX Khu A, ĐHQG TP. HCM, Dĩ An, Bình Dương"
    });
  }
}

export const storage = new MemStorage();
