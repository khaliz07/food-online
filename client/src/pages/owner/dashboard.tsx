import React from 'react';
import { Link } from 'wouter';
import { 
  ShoppingBag, 
  ChefHat, 
  DollarSign, 
  ArrowRight,
  Bell 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardStats, Notification } from '@/lib/types';

// Mock data
const mockStats: DashboardStats = {
  pendingOrders: 5,
  completedOrders: 12,
  todayRevenue: 1250000,
  availableItems: 24,
  notifications: [
    {
      id: 1,
      title: 'Đơn hàng mới',
      message: 'Đơn hàng #12345 vừa được đặt',
      type: 'order',
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 5) // 5 phút trước
    },
    {
      id: 2,
      title: 'Đơn hàng đã hủy',
      message: 'Đơn hàng #12340 đã bị hủy bởi khách hàng',
      type: 'order',
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 30) // 30 phút trước
    },
    {
      id: 3,
      title: 'Doanh thu tuần',
      message: 'Doanh thu tuần này đã tăng 15% so với tuần trước',
      type: 'revenue',
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 ngày trước
    }
  ]
};

// Format số tiền thành VND
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
    .format(amount)
    .replace('₫', 'đ');
};

// Format thời gian tương đối 
const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // Dưới 1 phút
  if (diff < 60 * 1000) {
    return 'Vừa xong';
  }
  
  // Dưới 1 giờ
  if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000));
    return `${minutes} phút trước`;
  }
  
  // Dưới 1 ngày
  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000));
    return `${hours} giờ trước`;
  }
  
  // Trên 1 ngày
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  return `${days} ngày trước`;
};

const NotificationItem = ({ notification }: { notification: Notification }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'order':
        return <ShoppingBag className="h-5 w-5 text-orange-500" />;
      case 'revenue':
        return <DollarSign className="h-5 w-5 text-green-500" />;
      case 'system':
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };
  
  return (
    <div className={`p-3 border-b border-gray-100 flex gap-3 items-start ${notification.isRead ? 'opacity-70' : ''}`}>
      <div className="bg-gray-100 p-2 rounded-full">
        {getIcon()}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-sm">{notification.title}</h4>
          <span className="text-xs text-gray-500">{formatRelativeTime(notification.createdAt)}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
      </div>
      {!notification.isRead && <div className="w-2 h-2 rounded-full bg-primary mt-2" />}
    </div>
  );
};

export default function OwnerDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight hidden md:block">Tổng quan hoạt động</h2>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đơn đang xử lý</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockStats.completedOrders} đơn đã hoàn thành hôm nay
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu hôm nay</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(mockStats.todayRevenue)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +15% so với hôm qua
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Món đang bán</CardTitle>
            <ChefHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.availableItems}</div>
            <p className="text-xs text-muted-foreground mt-1">
              3 món mới trong tuần này
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đơn gần đây</CardTitle>
            <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Hoạt động
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 phút</div>
            <p className="text-xs text-muted-foreground mt-1">
              Từ đơn hàng gần nhất
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-medium text-lg mb-2">Đơn hàng đang chờ</h3>
            <p className="text-sm text-gray-600 mb-4">
              Bạn có {mockStats.pendingOrders} đơn hàng đang chờ xử lý
            </p>
            <Link href="/owner/orders">
              <Button className="w-full">
                Xử lý đơn ngay
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="bg-orange-50 border-orange-100">
          <CardContent className="p-6">
            <h3 className="font-medium text-lg mb-2">Quản lý món ăn</h3>
            <p className="text-sm text-gray-600 mb-4">
              Cập nhật món ăn, giá cả hoặc thêm món mới
            </p>
            <Link href="/owner/menu">
              <Button variant="outline" className="w-full">
                Quản lý món
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-6">
            <h3 className="font-medium text-lg mb-2">Thống kê doanh thu</h3>
            <p className="text-sm text-gray-600 mb-4">
              Xem báo cáo doanh thu và đơn hàng
            </p>
            <Link href="/owner/stats">
              <Button variant="outline" className="w-full">
                Xem thống kê
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent notifications */}
      <Card>
        <CardHeader className="px-6">
          <div className="flex items-center justify-between">
            <CardTitle>Thông báo gần đây</CardTitle>
            <Link href="/owner/notifications">
              <Button variant="ghost" size="sm" className="gap-1">
                Xem tất cả
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="px-0 py-0">
          <div className="max-h-80 overflow-y-auto">
            {mockStats.notifications.length > 0 ? (
              mockStats.notifications.map(notification => (
                <NotificationItem key={notification.id} notification={notification} />
              ))
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                Không có thông báo nào
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}