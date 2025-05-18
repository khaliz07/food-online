import { Order, OrderItem, Restaurant, User } from './types';

export type DeliveryStatus = 'new' | 'picking_up' | 'delivering' | 'delivered' | 'failed';

export type ShipperOrder = Order & {
  deliveryStatus: DeliveryStatus;
  pickupTime?: Date;
  startDeliveryTime?: Date;
  completedTime?: Date;
  failureReason?: string;
  assignedShipperId: number;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  restaurant: Restaurant;
  items: OrderItem[];
};

export type DeliveryStats = {
  totalDeliveries: number;
  deliveredCount: number;
  failedCount: number;
  averageDeliveryTime: number; // in minutes
  dailyStats: {
    date: string;
    deliveries: number;
    successRate: number;
  }[];
};

export type ShipperNotification = {
  id: number;
  title: string;
  message: string;
  orderId?: number;
  type: 'new_order' | 'system' | 'status_update';
  isRead: boolean;
  createdAt: Date;
};