import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Notification } from '@/lib/types';
import { 
  Bell, 
  ShoppingBag, 
  DollarSign, 
  Info, 
  CheckCircle, 
  Trash2,
  MailOpen,
  Mail
} from 'lucide-react';

// Mock data cho thông báo
const mockNotifications: Notification[] = [
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
  },
  {
    id: 4,
    title: 'Thông báo hệ thống',
    message: 'Ứng dụng sẽ được bảo trì vào ngày 20/05 từ 2:00 - 4:00 sáng',
    type: 'system',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36) // 1.5 ngày trước
  },
  {
    id: 5,
    title: 'Đơn hàng đã hoàn thành',
    message: 'Đơn hàng #12338 đã được giao thành công',
    type: 'order',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48) // 2 ngày trước
  },
  {
    id: 6,
    title: 'Doanh thu tháng',
    message: 'Doanh thu tháng này đã đạt 85% mục tiêu. Cố lên!',
    type: 'revenue',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72) // 3 ngày trước
  },
  {
    id: 7,
    title: 'Cập nhật chính sách',
    message: 'Chính sách giao hàng đã được cập nhật. Vui lòng kiểm tra.',
    type: 'system',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120) // 5 ngày trước
  },
];

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
  
  // Dưới 7 ngày
  if (diff < 7 * 24 * 60 * 60 * 1000) {
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    return `${days} ngày trước`;
  }
  
  // Trên 7 ngày - hiển thị ngày tháng
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

// Component cho một thông báo
interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
}

const NotificationItem = ({ notification, onMarkAsRead, onDelete }: NotificationItemProps) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'order':
        return <ShoppingBag className="h-5 w-5 text-orange-500" />;
      case 'revenue':
        return <DollarSign className="h-5 w-5 text-green-500" />;
      case 'system':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <div className={`p-4 border-b border-gray-100 flex gap-3 items-start ${notification.isRead ? 'bg-white' : 'bg-blue-50'}`}>
      <div className="bg-gray-100 p-2 rounded-full">
        {getIcon()}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className={`font-medium ${notification.isRead ? 'text-gray-700' : 'text-black'}`}>
            {notification.title}
          </h4>
          <span className="text-xs text-gray-500">{formatRelativeTime(notification.createdAt)}</span>
        </div>
        <p className={`text-sm mt-1 ${notification.isRead ? 'text-gray-600' : 'text-gray-800'}`}>
          {notification.message}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {!notification.isRead && (
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8" 
            onClick={() => onMarkAsRead(notification.id)}
            title="Đánh dấu đã đọc"
          >
            <MailOpen className="h-4 w-4" />
          </Button>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50" 
          onClick={() => onDelete(notification.id)}
          title="Xóa thông báo"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default function OwnerNotifications() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  // Lọc thông báo theo loại
  const allNotifications = notifications;
  const unreadNotifications = notifications.filter(n => !n.isRead);
  const orderNotifications = notifications.filter(n => n.type === 'order');
  const revenueNotifications = notifications.filter(n => n.type === 'revenue');
  const systemNotifications = notifications.filter(n => n.type === 'system');
  
  // Xử lý đánh dấu đã đọc
  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
    
    toast({
      title: 'Thông báo đã được đánh dấu đã đọc',
      description: 'Thông báo đã được cập nhật.',
    });
  };
  
  // Xử lý xóa thông báo
  const handleDelete = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    
    toast({
      title: 'Đã xóa thông báo',
      description: 'Thông báo đã được xóa khỏi danh sách.',
    });
  };
  
  // Xử lý đánh dấu tất cả đã đọc
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    
    toast({
      title: 'Đã đánh dấu tất cả là đã đọc',
      description: 'Tất cả thông báo đã được đánh dấu là đã đọc.',
    });
  };
  
  // Xử lý xóa tất cả thông báo đã đọc
  const handleDeleteAllRead = () => {
    setNotifications(prev => prev.filter(notification => !notification.isRead));
    
    toast({
      title: 'Đã xóa thông báo đã đọc',
      description: 'Tất cả thông báo đã đọc đã được xóa khỏi danh sách.',
    });
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight hidden md:block mb-4">Thông báo</h2>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {unreadNotifications.length} chưa đọc / {notifications.length} tổng
          </span>
          {unreadNotifications.length > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleMarkAllAsRead}
              className="h-8"
            >
              <MailOpen className="h-4 w-4 mr-2" />
              Đánh dấu đã đọc tất cả
            </Button>
          )}
        </div>
        {notifications.filter(n => n.isRead).length > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDeleteAllRead}
            className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Xóa tất cả đã đọc
          </Button>
        )}
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all" className="relative">
                Tất cả
                {unreadNotifications.length > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadNotifications.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread">Chưa đọc</TabsTrigger>
              <TabsTrigger value="order">Đơn hàng</TabsTrigger>
              <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
              <TabsTrigger value="system">Hệ thống</TabsTrigger>
            </TabsList>
            
            <CardContent className="p-0 mt-4">
              <TabsContent value="all" className="mt-0">
                {allNotifications.length > 0 ? (
                  <div className="divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
                    {allNotifications.map(notification => (
                      <NotificationItem 
                        key={notification.id} 
                        notification={notification}
                        onMarkAsRead={handleMarkAsRead}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Bell className="h-12 w-12 text-gray-300 mx-auto" />
                    <h3 className="mt-2 text-gray-500">Không có thông báo nào</h3>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="unread" className="mt-0">
                {unreadNotifications.length > 0 ? (
                  <div className="divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
                    {unreadNotifications.map(notification => (
                      <NotificationItem 
                        key={notification.id} 
                        notification={notification}
                        onMarkAsRead={handleMarkAsRead}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MailOpen className="h-12 w-12 text-gray-300 mx-auto" />
                    <h3 className="mt-2 text-gray-500">Không có thông báo chưa đọc</h3>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="order" className="mt-0">
                {orderNotifications.length > 0 ? (
                  <div className="divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
                    {orderNotifications.map(notification => (
                      <NotificationItem 
                        key={notification.id} 
                        notification={notification}
                        onMarkAsRead={handleMarkAsRead}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto" />
                    <h3 className="mt-2 text-gray-500">Không có thông báo đơn hàng</h3>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="revenue" className="mt-0">
                {revenueNotifications.length > 0 ? (
                  <div className="divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
                    {revenueNotifications.map(notification => (
                      <NotificationItem 
                        key={notification.id} 
                        notification={notification}
                        onMarkAsRead={handleMarkAsRead}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <DollarSign className="h-12 w-12 text-gray-300 mx-auto" />
                    <h3 className="mt-2 text-gray-500">Không có thông báo doanh thu</h3>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="system" className="mt-0">
                {systemNotifications.length > 0 ? (
                  <div className="divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
                    {systemNotifications.map(notification => (
                      <NotificationItem 
                        key={notification.id} 
                        notification={notification}
                        onMarkAsRead={handleMarkAsRead}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Info className="h-12 w-12 text-gray-300 mx-auto" />
                    <h3 className="mt-2 text-gray-500">Không có thông báo hệ thống</h3>
                  </div>
                )}
              </TabsContent>
            </CardContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
}