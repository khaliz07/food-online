import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ShipperNotification } from '@/lib/shipper-types';
import { 
  Bell, 
  Package, 
  Info, 
  TrendingUp, 
  CheckCircle, 
  Trash2, 
  MailOpen,
  Search
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data cho thông báo
const mockNotifications: ShipperNotification[] = [
  {
    id: 1,
    title: 'Đơn hàng mới #1001',
    message: 'Bạn vừa được giao đơn hàng mới từ Nhà hàng Phở Việt',
    type: 'new_order',
    orderId: 1001,
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000) // 5 phút trước
  },
  {
    id: 2,
    title: 'Nhắc nhở giao hàng',
    message: 'Đơn hàng #1002 đang chờ bạn lấy hàng từ Sushi Nhật Bản',
    type: 'system',
    orderId: 1002,
    isRead: false,
    createdAt: new Date(Date.now() - 20 * 60 * 1000) // 20 phút trước
  },
  {
    id: 3,
    title: 'Đơn hàng hoàn thành',
    message: 'Bạn đã hoàn thành giao đơn hàng #1004 thành công',
    type: 'status_update',
    orderId: 1004,
    isRead: true,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 giờ trước
  },
  {
    id: 4,
    title: 'Thông báo hệ thống',
    message: 'Ứng dụng sẽ bảo trì vào ngày 20/05 từ 2:00 - 4:00 sáng',
    type: 'system',
    isRead: true,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000) // 12 giờ trước
  },
  {
    id: 5,
    title: 'Bạn đã hoàn thành 10 đơn hàng',
    message: 'Chúc mừng bạn đã hoàn thành 10 đơn hàng. Tiếp tục phát huy nhé!',
    type: 'status_update',
    isRead: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 ngày trước
  },
  {
    id: 6,
    title: 'Kỷ lục mới!',
    message: 'Bạn đã đạt kỷ lục mới với thời gian giao hàng trung bình 25 phút',
    type: 'status_update',
    isRead: true,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000) // 2 ngày trước
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
  
  // Trên 7 ngày
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

// Component thông báo đơn lẻ
interface NotificationItemProps {
  notification: ShipperNotification;
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
  onSelect: (id: number, selected: boolean) => void;
  isSelected: boolean;
}

const NotificationItem = ({ 
  notification, 
  onMarkAsRead, 
  onDelete, 
  onSelect,
  isSelected
}: NotificationItemProps) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'new_order':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'system':
        return <Info className="h-5 w-5 text-orange-500" />;
      case 'status_update':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <div className={`p-4 border-b border-gray-100 ${notification.isRead ? 'bg-white' : 'bg-blue-50'}`}>
      <div className="flex items-start gap-3">
        <Checkbox 
          checked={isSelected}
          onCheckedChange={(checked) => onSelect(notification.id, !!checked)}
          className="mt-1"
        />
        
        <div className="bg-gray-100 p-2 rounded-full">
          {getIcon()}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className={`font-medium ${notification.isRead ? 'text-gray-700' : 'text-black'}`}>
              {notification.title}
              {!notification.isRead && (
                <Badge variant="outline" className="bg-blue-100 text-blue-800 ml-2 text-xs">Mới</Badge>
              )}
            </h4>
            <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
              {formatRelativeTime(notification.createdAt)}
            </span>
          </div>
          <p className={`text-sm mt-1 ${notification.isRead ? 'text-gray-600' : 'text-gray-800'}`}>
            {notification.message}
          </p>
          
          {notification.orderId && (
            <div className="mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs"
                asChild
              >
                <a href={`/shipper/order/${notification.orderId}`}>
                  Xem chi tiết đơn
                </a>
              </Button>
            </div>
          )}
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
    </div>
  );
};

export default function ShipperNotifications() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<ShipperNotification[]>(mockNotifications);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  // Lọc thông báo theo tab và tìm kiếm
  const filterNotifications = (notificationList: ShipperNotification[]) => {
    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      notificationList = notificationList.filter(notification => 
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (notification.orderId && notification.orderId.toString().includes(searchTerm))
      );
    }
    
    // Sắp xếp theo tiêu chí
    if (sortBy === 'newest') {
      notificationList.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else if (sortBy === 'oldest') {
      notificationList.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    } else if (sortBy === 'unread_first') {
      notificationList.sort((a, b) => {
        if (a.isRead === b.isRead) {
          return b.createdAt.getTime() - a.createdAt.getTime();
        }
        return a.isRead ? 1 : -1; // Chưa đọc lên đầu
      });
    }
    
    return notificationList;
  };
  
  // Lọc thông báo theo tab
  const baseUnreadNotifications = notifications.filter(n => !n.isRead);
  const baseOrderNotifications = notifications.filter(n => n.type === 'new_order');
  const baseSystemNotifications = notifications.filter(n => n.type === 'system');
  const baseStatusNotifications = notifications.filter(n => n.type === 'status_update');
  
  // Áp dụng bộ lọc
  const unreadNotifications = filterNotifications(baseUnreadNotifications);
  const orderNotifications = filterNotifications(baseOrderNotifications);
  const systemNotifications = filterNotifications(baseSystemNotifications);
  const statusNotifications = filterNotifications(baseStatusNotifications);
  const filteredNotifications = filterNotifications([...notifications]);
  
  // Xử lý chọn/bỏ chọn tất cả
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      // Lấy tất cả ID của thông báo trên tab hiện tại
      let idsToSelect: number[] = [];
      
      switch (activeTab) {
        case 'unread':
          idsToSelect = unreadNotifications.map(n => n.id);
          break;
        case 'order':
          idsToSelect = orderNotifications.map(n => n.id);
          break;
        case 'system':
          idsToSelect = systemNotifications.map(n => n.id);
          break;
        case 'status':
          idsToSelect = statusNotifications.map(n => n.id);
          break;
        default:
          idsToSelect = filteredNotifications.map(n => n.id);
      }
      
      setSelectedIds(idsToSelect);
    } else {
      setSelectedIds([]);
    }
  };
  
  // Xử lý chọn/bỏ chọn một thông báo
  const handleSelect = (id: number, selected: boolean) => {
    if (selected) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(itemId => itemId !== id));
    }
  };
  
  // Xử lý đánh dấu đã đọc một thông báo
  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
    
    toast({
      title: 'Đã đánh dấu là đã đọc',
      description: 'Thông báo đã được đánh dấu là đã đọc.',
    });
  };
  
  // Xử lý đánh dấu đã đọc nhiều thông báo
  const handleMarkSelectedAsRead = () => {
    if (selectedIds.length === 0) {
      toast({
        title: 'Chưa chọn thông báo',
        description: 'Vui lòng chọn ít nhất một thông báo để đánh dấu đã đọc.',
        variant: 'destructive'
      });
      return;
    }
    
    setNotifications(prev => 
      prev.map(notification => 
        selectedIds.includes(notification.id) ? { ...notification, isRead: true } : notification
      )
    );
    
    toast({
      title: 'Đã đánh dấu là đã đọc',
      description: `${selectedIds.length} thông báo đã được đánh dấu là đã đọc.`,
    });
    
    setSelectedIds([]);
  };
  
  // Xử lý xóa một thông báo
  const handleDelete = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    
    toast({
      title: 'Đã xóa thông báo',
      description: 'Thông báo đã được xóa.',
    });
  };
  
  // Xử lý xóa nhiều thông báo
  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      toast({
        title: 'Chưa chọn thông báo',
        description: 'Vui lòng chọn ít nhất một thông báo để xóa.',
        variant: 'destructive'
      });
      return;
    }
    
    setNotifications(prev => prev.filter(notification => !selectedIds.includes(notification.id)));
    
    toast({
      title: 'Đã xóa thông báo',
      description: `${selectedIds.length} thông báo đã được xóa.`,
    });
    
    setSelectedIds([]);
  };
  
  // Lấy danh sách thông báo hiện tại dựa vào tab
  const getCurrentNotifications = () => {
    switch (activeTab) {
      case 'unread':
        return unreadNotifications;
      case 'order':
        return orderNotifications;
      case 'system':
        return systemNotifications;
      case 'status':
        return statusNotifications;
      default:
        return notifications;
    }
  };
  
  const currentNotifications = getCurrentNotifications();
  const allSelected = currentNotifications.length > 0 && selectedIds.length === currentNotifications.length;
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold hidden md:block">Thông báo</h1>
      
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle>Thông báo của bạn</CardTitle>
          <div className="text-sm text-muted-foreground">
            {baseUnreadNotifications.length} chưa đọc
          </div>
        </CardHeader>
        
        <div className="px-6 py-2 border-b border-gray-100">
          <div className="relative mb-3">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Tìm kiếm thông báo..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="selectAll" 
                checked={allSelected}
                onCheckedChange={handleSelectAll}
              />
              <label 
                htmlFor="selectAll" 
                className="text-sm cursor-pointer"
              >
                Chọn tất cả
              </label>
            </div>
            
            <div className="flex items-center gap-2">
              <Select 
                value={sortBy} 
                onValueChange={setSortBy}
              >
                <SelectTrigger className="w-[150px] h-8 text-xs">
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="oldest">Cũ nhất</SelectItem>
                  <SelectItem value="unread_first">Chưa đọc trước</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleMarkSelectedAsRead}
                  disabled={selectedIds.length === 0}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Đánh dấu đã đọc
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleDeleteSelected}
                  disabled={selectedIds.length === 0}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Xóa đã chọn
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6 pt-2">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" className="text-xs">
                Tất cả{' '}
                <span className="ml-1 text-xs">({notifications.length})</span>
              </TabsTrigger>
              <TabsTrigger value="unread" className="text-xs">
                Chưa đọc{' '}
                <span className="ml-1 text-xs">({unreadNotifications.length})</span>
              </TabsTrigger>
              <TabsTrigger value="order" className="text-xs">
                Đơn hàng{' '}
                <span className="ml-1 text-xs">({orderNotifications.length})</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="text-xs">
                Hệ thống{' '}
                <span className="ml-1 text-xs">({systemNotifications.length})</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="pt-0">
            {filteredNotifications.length > 0 ? (
              <div className="max-h-[70vh] overflow-y-auto">
                {filteredNotifications.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDelete}
                    onSelect={handleSelect}
                    isSelected={selectedIds.includes(notification.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Bell className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-lg font-medium">Không có thông báo</h3>
                <p className="mt-1 text-gray-500">
                  {searchTerm ? 'Không tìm thấy thông báo nào phù hợp với từ khóa tìm kiếm.' : 'Bạn không có thông báo nào trong hệ thống.'}
                </p>
                {searchTerm && (
                  <Button variant="outline" size="sm" className="mt-4" onClick={() => setSearchTerm('')}>
                    Xóa tìm kiếm
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="unread" className="pt-0">
            {unreadNotifications.length > 0 ? (
              <div className="max-h-[70vh] overflow-y-auto">
                {unreadNotifications.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDelete}
                    onSelect={handleSelect}
                    isSelected={selectedIds.includes(notification.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-lg font-medium">Không có thông báo chưa đọc</h3>
                <p className="mt-1 text-gray-500">
                  Bạn đã đọc tất cả thông báo.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="order" className="pt-0">
            {orderNotifications.length > 0 ? (
              <div className="max-h-[70vh] overflow-y-auto">
                {orderNotifications.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDelete}
                    onSelect={handleSelect}
                    isSelected={selectedIds.includes(notification.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Package className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-lg font-medium">Không có thông báo đơn hàng</h3>
                <p className="mt-1 text-gray-500">
                  Bạn không có thông báo nào về đơn hàng.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="system" className="pt-0">
            {systemNotifications.length > 0 ? (
              <div className="max-h-[70vh] overflow-y-auto">
                {systemNotifications.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDelete}
                    onSelect={handleSelect}
                    isSelected={selectedIds.includes(notification.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Info className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-lg font-medium">Không có thông báo hệ thống</h3>
                <p className="mt-1 text-gray-500">
                  Bạn không có thông báo nào từ hệ thống.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}