import React, { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  PackageCheck, 
  XCircle, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from '@/hooks/use-toast';
import { Order, OrderItem, FoodItem } from '@/lib/types';

// Mock data cho các đơn hàng
const mockOrders: Order[] = [
  {
    id: 1,
    userId: 1,
    restaurantId: 1,
    total: 185000,
    status: 'pending',
    paymentMethod: 'COD',
    address: '123 Đường Nguyễn Văn Linh, Quận 7, TP.HCM',
    createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 phút trước
    customerName: 'Nguyễn Văn A',
    customerPhone: '0901234567',
    items: [
      {
        id: 1,
        orderId: 1,
        foodItemId: 1,
        quantity: 2,
        price: 75000,
        subtotal: 150000,
        foodItem: {
          id: 1,
          restaurantId: 1,
          name: 'Phở bò đặc biệt',
          description: 'Phở bò với thịt bò tươi ngon, giò heo và nhiều rau thơm',
          image: 'https://images.unsplash.com/photo-1583224964978-2ba74e88b5a9',
          price: 75000,
        }
      },
      {
        id: 2,
        orderId: 1,
        foodItemId: 2,
        quantity: 1,
        price: 35000,
        subtotal: 35000,
        foodItem: {
          id: 2,
          restaurantId: 1,
          name: 'Chả giò hải sản',
          description: 'Chả giò với nhân hải sản thơm ngon',
          image: 'https://images.unsplash.com/photo-1581184953963-d15972933db1',
          price: 35000,
        }
      }
    ]
  },
  {
    id: 2,
    userId: 2,
    restaurantId: 1,
    total: 250000,
    status: 'processing',
    paymentMethod: 'Banking',
    address: '456 Đường Lê Văn Lương, Quận 7, TP.HCM',
    createdAt: new Date(Date.now() - 45 * 60 * 1000), // 45 phút trước
    customerName: 'Trần Thị B',
    customerPhone: '0909876543',
    items: [
      {
        id: 3,
        orderId: 2,
        foodItemId: 3,
        quantity: 2,
        price: 80000,
        subtotal: 160000,
        foodItem: {
          id: 3,
          restaurantId: 1,
          name: 'Bún bò Huế',
          description: 'Bún bò Huế cay nồng đặc trưng miền Trung',
          image: 'https://images.unsplash.com/photo-1576577445504-6af96477db52',
          price: 80000,
        }
      },
      {
        id: 4,
        orderId: 2,
        foodItemId: 4,
        quantity: 3,
        price: 30000,
        subtotal: 90000,
        foodItem: {
          id: 4,
          restaurantId: 1,
          name: 'Gỏi cuốn tôm thịt',
          description: 'Gỏi cuốn tươi mát với tôm, thịt và rau sống',
          image: 'https://images.unsplash.com/photo-1562059373-bc6efabcc4b9',
          price: 30000,
        }
      }
    ]
  },
  {
    id: 3,
    userId: 3,
    restaurantId: 1,
    total: 320000,
    status: 'ready',
    paymentMethod: 'COD',
    address: '789 Đường Nguyễn Hữu Thọ, Quận 7, TP.HCM',
    createdAt: new Date(Date.now() - 90 * 60 * 1000), // 1.5 giờ trước
    customerName: 'Lê Văn C',
    customerPhone: '0912345678',
    items: [
      {
        id: 5,
        orderId: 3,
        foodItemId: 5,
        quantity: 1,
        price: 250000,
        subtotal: 250000,
        foodItem: {
          id: 5,
          restaurantId: 1,
          name: 'Lẩu thái hải sản (nhỏ)',
          description: 'Lẩu Thái chua cay với các loại hải sản tươi ngon',
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
          price: 250000,
        }
      },
      {
        id: 6,
        orderId: 3,
        foodItemId: 6,
        quantity: 2,
        price: 35000,
        subtotal: 70000,
        foodItem: {
          id: 6,
          restaurantId: 1,
          name: 'Trà đào cam sả',
          description: 'Trà đào thơm mát với cam sả',
          image: 'https://images.unsplash.com/photo-1527761939622-bf599b87e2e3',
          price: 35000,
        }
      }
    ]
  },
  {
    id: 4,
    userId: 4,
    restaurantId: 1,
    total: 175000,
    status: 'completed',
    paymentMethod: 'Banking',
    address: '101 Đường Nguyễn Đức Cảnh, Quận 7, TP.HCM',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 giờ trước
    customerName: 'Phạm Thị D',
    customerPhone: '0987654321',
    items: [
      {
        id: 7,
        orderId: 4,
        foodItemId: 7,
        quantity: 1,
        price: 120000,
        subtotal: 120000,
        foodItem: {
          id: 7,
          restaurantId: 1,
          name: 'Cơm gà Hải Nam',
          description: 'Cơm gà Hải Nam với gà hấp mềm, thơm và nước chấm đặc biệt',
          image: 'https://images.unsplash.com/photo-1530469912745-a215c6b256ea',
          price: 120000,
        }
      },
      {
        id: 8,
        orderId: 4,
        foodItemId: 8,
        quantity: 1,
        price: 55000,
        subtotal: 55000,
        foodItem: {
          id: 8,
          restaurantId: 1,
          name: 'Súp hoành thánh',
          description: 'Súp hoành thánh với nước dùng trong và ngọt',
          image: 'https://images.unsplash.com/photo-1469234496837-d0101f54be3e',
          price: 55000,
        }
      }
    ]
  },
  {
    id: 5,
    userId: 5,
    restaurantId: 1,
    total: 150000,
    status: 'cancelled',
    paymentMethod: 'COD',
    address: '202 Đường Nguyễn Thị Thập, Quận 7, TP.HCM',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 giờ trước
    customerName: 'Hoàng Văn E',
    customerPhone: '0965432109',
    note: 'Khách hàng hủy vì có việc đột xuất',
    items: [
      {
        id: 9,
        orderId: 5,
        foodItemId: 9,
        quantity: 2,
        price: 75000,
        subtotal: 150000,
        foodItem: {
          id: 9,
          restaurantId: 1,
          name: 'Bánh xèo',
          description: 'Bánh xèo giòn với nhân tôm, thịt và giá đỗ',
          image: 'https://images.unsplash.com/photo-1562317305-58a17fe2c0e9',
          price: 75000,
        }
      }
    ]
  }
];

// Hiển thị trạng thái đơn hàng bằng tiếng Việt
const getOrderStatus = (status: string) => {
  switch (status) {
    case 'pending':
      return { text: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="h-4 w-4 mr-1" /> };
    case 'processing':
      return { text: 'Đang chuẩn bị', color: 'bg-blue-100 text-blue-800', icon: <Clock className="h-4 w-4 mr-1" /> };
    case 'ready':
      return { text: 'Sẵn sàng giao', color: 'bg-green-100 text-green-800', icon: <PackageCheck className="h-4 w-4 mr-1" /> };
    case 'completed':
      return { text: 'Đã hoàn thành', color: 'bg-gray-100 text-gray-800', icon: <CheckCircle className="h-4 w-4 mr-1" /> };
    case 'cancelled':
      return { text: 'Đã hủy', color: 'bg-red-100 text-red-800', icon: <XCircle className="h-4 w-4 mr-1" /> };
    default:
      return { text: 'Không xác định', color: 'bg-gray-100 text-gray-800', icon: null };
  }
};

// Format tiền tệ
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
    .format(amount)
    .replace('₫', 'đ');
};

// Format thời gian
const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

const OrderItemCard = ({ item }: { item: OrderItem }) => {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
        <img 
          src={item.foodItem?.image} 
          alt={item.foodItem?.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-sm">{item.foodItem?.name}</h4>
        <div className="flex justify-between mt-1">
          <span className="text-sm text-gray-600">SL: {item.quantity}</span>
          <span className="text-sm font-semibold">{formatCurrency(item.subtotal)}</span>
        </div>
      </div>
    </div>
  );
};

const OrderCard = ({ order, onStatusChange }: { order: Order, onStatusChange: (id: number, status: string) => void }) => {
  const status = getOrderStatus(order.status);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Hiển thị các action buttons dựa vào trạng thái
  const renderActionButtons = () => {
    switch (order.status) {
      case 'pending':
        return (
          <>
            <Button 
              size="sm" 
              className="w-full"
              onClick={() => onStatusChange(order.id, 'processing')}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Xác nhận đơn
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <XCircle className="h-4 w-4 mr-2" />
                  Từ chối đơn
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Xác nhận từ chối đơn hàng</AlertDialogTitle>
                  <AlertDialogDescription>
                    Bạn có chắc chắn muốn từ chối đơn hàng này? Hành động này không thể hoàn tác.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => onStatusChange(order.id, 'cancelled')}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Xác nhận từ chối
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        );
      case 'processing':
        return (
          <Button 
            size="sm" 
            className="w-full"
            onClick={() => onStatusChange(order.id, 'ready')}
          >
            <PackageCheck className="h-4 w-4 mr-2" />
            Hoàn tất chuẩn bị
          </Button>
        );
      case 'ready':
        return (
          <Button 
            size="sm" 
            className="w-full"
            onClick={() => onStatusChange(order.id, 'completed')}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Đã giao hàng
          </Button>
        );
      default:
        return null;
    }
  };
  
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">Đơn #{order.id}</CardTitle>
            <CardDescription>{formatTime(order.createdAt)}</CardDescription>
          </div>
          <Badge className={`flex items-center ${status.color}`}>
            {status.icon}
            {status.text}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="bg-gray-50 rounded-md p-3 mb-3">
          <div className="font-medium text-sm mb-1">Thông tin giao hàng:</div>
          <div className="text-sm text-gray-700">{order.customerName} | {order.customerPhone}</div>
          <div className="text-sm text-gray-700 mt-1">{order.address}</div>
          {order.note && (
            <div className="text-sm text-orange-600 mt-1 italic">Ghi chú: {order.note}</div>
          )}
        </div>
        
        <div className="mb-2">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center text-sm font-medium text-primary hover:underline"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Ẩn chi tiết
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Xem chi tiết ({order.items?.length || 0} món)
              </>
            )}
          </button>
        </div>
        
        {isExpanded && (
          <div className="border-t border-gray-100 pt-3">
            {order.items?.map(item => (
              <OrderItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-0 items-center">
        <div className="font-semibold">
          Tổng cộng: {formatCurrency(order.total)}
        </div>
        <div>
          {renderActionButtons()}
        </div>
      </CardFooter>
    </Card>
  );
};

export default function OwnerOrders() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  
  // Xử lý thay đổi trạng thái đơn hàng
  const handleStatusChange = (id: number, status: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === id ? { ...order, status } : order
      )
    );
    
    // Hiển thị thông báo
    const statusText = getOrderStatus(status).text;
    toast({
      title: `Cập nhật thành công`,
      description: `Đơn hàng #${id} đã được chuyển sang trạng thái: ${statusText}`,
    });
  };
  
  // Lọc đơn hàng theo trạng thái
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const processingOrders = orders.filter(order => order.status === 'processing');
  const readyOrders = orders.filter(order => order.status === 'ready');
  const completedOrders = orders.filter(order => order.status === 'completed');
  const cancelledOrders = orders.filter(order => order.status === 'cancelled');
  
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight hidden md:block mb-6">Quản lý đơn hàng</h2>
      
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="pending" className="relative">
            Mới nhận
            {pendingOrders.length > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {pendingOrders.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="processing">
            Đang chuẩn bị
            {processingOrders.length > 0 && (
              <span className="ml-1 bg-blue-100 text-blue-800 text-xs rounded-full px-1.5">
                {processingOrders.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="ready">
            Sẵn sàng giao
            {readyOrders.length > 0 && (
              <span className="ml-1 bg-green-100 text-green-800 text-xs rounded-full px-1.5">
                {readyOrders.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
          <TabsTrigger value="cancelled">Đã hủy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-0">
          {pendingOrders.length > 0 ? (
            pendingOrders.map(order => (
              <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-md">
              <p className="text-gray-500">Không có đơn hàng nào đang chờ xác nhận</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="processing" className="mt-0">
          {processingOrders.length > 0 ? (
            processingOrders.map(order => (
              <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-md">
              <p className="text-gray-500">Không có đơn hàng nào đang chuẩn bị</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="ready" className="mt-0">
          {readyOrders.length > 0 ? (
            readyOrders.map(order => (
              <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-md">
              <p className="text-gray-500">Không có đơn hàng nào sẵn sàng giao</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          {completedOrders.length > 0 ? (
            completedOrders.map(order => (
              <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-md">
              <p className="text-gray-500">Không có đơn hàng nào đã hoàn thành</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="cancelled" className="mt-0">
          {cancelledOrders.length > 0 ? (
            cancelledOrders.map(order => (
              <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-md">
              <p className="text-gray-500">Không có đơn hàng nào đã hủy</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}