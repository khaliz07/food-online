import React, { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { DeliveryStats, ShipperOrder, DeliveryStatus } from '@/lib/shipper-types';
import { 
  BarChart,
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  CalendarIcon, 
  Search, 
  SlidersHorizontal, 
  Calendar as CalendarIcon2,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { format, subDays, subMonths, isWithinInterval } from 'date-fns';
import { vi } from 'date-fns/locale';

// Mock data cho lịch sử giao hàng
const mockCompletedOrders: ShipperOrder[] = [
  {
    id: 1004,
    userId: 104,
    restaurantId: 1,
    total: 175000,
    status: 'completed',
    deliveryStatus: 'delivered',
    pickupTime: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 giờ trước
    startDeliveryTime: new Date(Date.now() - 3.8 * 60 * 60 * 1000), // 3.8 giờ trước
    completedTime: new Date(Date.now() - 3.5 * 60 * 60 * 1000), // 3.5 giờ trước
    paymentMethod: 'Banking',
    address: '101 Đường Nguyễn Đức Cảnh, Quận 7, TP.HCM',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 giờ trước
    assignedShipperId: 1,
    customer: {
      name: 'Phạm Thị D',
      phone: '0987654321',
      address: '101 Đường Nguyễn Đức Cảnh, Quận 7, TP.HCM'
    },
    restaurant: {
      id: 1,
      name: 'Nhà hàng Phở Việt',
      address: '456 Đường Lê Văn Lương, Quận 7, TP.HCM',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
      category: 'Việt Nam'
    },
    items: [
      {
        id: 7,
        orderId: 1004,
        foodItemId: 3,
        quantity: 2,
        price: 80000,
        subtotal: 160000,
        foodItem: {
          id: 3,
          restaurantId: 1,
          name: 'Bún bò Huế',
          image: 'https://images.unsplash.com/photo-1576577445504-6af96477db52',
          price: 80000
        }
      },
      {
        id: 8,
        orderId: 1004,
        foodItemId: 4,
        quantity: 1,
        price: 15000,
        subtotal: 15000,
        foodItem: {
          id: 4,
          restaurantId: 1,
          name: 'Trà đá',
          image: 'https://images.unsplash.com/photo-1507914464562-6ff4ac29692f',
          price: 15000
        }
      }
    ]
  },
  {
    id: 1005,
    userId: 105,
    restaurantId: 2,
    total: 150000,
    status: 'cancelled',
    deliveryStatus: 'failed',
    pickupTime: new Date(Date.now() - 7 * 60 * 60 * 1000), // 7 giờ trước
    startDeliveryTime: new Date(Date.now() - 6.8 * 60 * 60 * 1000), // 6.8 giờ trước
    paymentMethod: 'COD',
    address: '202 Đường Nguyễn Thị Thập, Quận 7, TP.HCM',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 giờ trước
    assignedShipperId: 1,
    failureReason: 'Không liên lạc được với khách hàng',
    customer: {
      name: 'Hoàng Văn E',
      phone: '0965432109',
      address: '202 Đường Nguyễn Thị Thập, Quận 7, TP.HCM'
    },
    restaurant: {
      id: 2,
      name: 'Sushi Nhật Bản',
      address: '789 Đường Nguyễn Hữu Thọ, Quận 7, TP.HCM',
      image: 'https://images.unsplash.com/photo-1563612116625-3012372fccce',
      category: 'Nhật Bản'
    },
    items: [
      {
        id: 9,
        orderId: 1005,
        foodItemId: 12,
        quantity: 5,
        price: 30000,
        subtotal: 150000,
        foodItem: {
          id: 12,
          restaurantId: 2,
          name: 'Gyoza',
          image: 'https://images.unsplash.com/photo-1620141925760-77950d54a056',
          price: 30000
        }
      }
    ]
  },
  {
    id: 1006,
    userId: 104,
    restaurantId: 3,
    total: 280000,
    status: 'completed',
    deliveryStatus: 'delivered',
    pickupTime: new Date(Date.now() - 24 * 60 * 60 * 1000 - 4 * 60 * 60 * 1000), // 1 ngày + 4 giờ trước
    startDeliveryTime: new Date(Date.now() - 24 * 60 * 60 * 1000 - 3.5 * 60 * 60 * 1000), // 1 ngày + 3.5 giờ trước
    completedTime: new Date(Date.now() - 24 * 60 * 60 * 1000 - 3 * 60 * 60 * 1000), // 1 ngày + 3 giờ trước
    paymentMethod: 'COD',
    address: '101 Đường Nguyễn Đức Cảnh, Quận 7, TP.HCM',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000 - 5 * 60 * 60 * 1000), // 1 ngày + 5 giờ trước
    assignedShipperId: 1,
    customer: {
      name: 'Phạm Thị D',
      phone: '0987654321',
      address: '101 Đường Nguyễn Đức Cảnh, Quận 7, TP.HCM'
    },
    restaurant: {
      id: 3,
      name: 'Cơm Tấm Sài Gòn',
      address: '101 Đường Nguyễn Đức Cảnh, Quận 7, TP.HCM',
      image: 'https://images.unsplash.com/photo-1614844036576-f4c31689de1f',
      category: 'Việt Nam'
    },
    items: [
      {
        id: 10,
        orderId: 1006,
        foodItemId: 20,
        quantity: 2,
        price: 120000,
        subtotal: 240000,
        foodItem: {
          id: 20,
          restaurantId: 3,
          name: 'Cơm tấm sườn bì chả',
          image: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5',
          price: 120000
        }
      },
      {
        id: 11,
        orderId: 1006,
        foodItemId: 21,
        quantity: 1,
        price: 40000,
        subtotal: 40000,
        foodItem: {
          id: 21,
          restaurantId: 3,
          name: 'Chè thái',
          image: 'https://images.unsplash.com/photo-1642411867063-6469ecc6020e',
          price: 40000
        }
      }
    ]
  },
  {
    id: 1007,
    userId: 102,
    restaurantId: 1,
    total: 150000,
    status: 'completed',
    deliveryStatus: 'delivered',
    pickupTime: new Date(Date.now() - 48 * 60 * 60 * 1000 - 4 * 60 * 60 * 1000), // 2 ngày + 4 giờ trước
    startDeliveryTime: new Date(Date.now() - 48 * 60 * 60 * 1000 - 3.5 * 60 * 60 * 1000), // 2 ngày + 3.5 giờ trước
    completedTime: new Date(Date.now() - 48 * 60 * 60 * 1000 - 3 * 60 * 60 * 1000), // 2 ngày + 3 giờ trước
    paymentMethod: 'Banking',
    address: '456 Đường Lê Văn Lương, Quận 7, TP.HCM',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000 - 5 * 60 * 60 * 1000), // 2 ngày + 5 giờ trước
    assignedShipperId: 1,
    customer: {
      name: 'Trần Thị B',
      phone: '0909876543',
      address: '456 Đường Lê Văn Lương, Quận 7, TP.HCM'
    },
    restaurant: {
      id: 1,
      name: 'Nhà hàng Phở Việt',
      address: '456 Đường Lê Văn Lương, Quận 7, TP.HCM',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
      category: 'Việt Nam'
    },
    items: [
      {
        id: 12,
        orderId: 1007,
        foodItemId: 1,
        quantity: 2,
        price: 75000,
        subtotal: 150000,
        foodItem: {
          id: 1,
          restaurantId: 1,
          name: 'Phở bò đặc biệt',
          image: 'https://images.unsplash.com/photo-1583224964978-2ba74e88b5a9',
          price: 75000
        }
      }
    ]
  },
];

// Mock data cho thống kê shipper
const mockStats: DeliveryStats = {
  totalDeliveries: 25,
  deliveredCount: 20,
  failedCount: 5,
  averageDeliveryTime: 35, // in minutes
  dailyStats: [
    { date: 'T2', deliveries: 4, successRate: 100 },
    { date: 'T3', deliveries: 5, successRate: 80 },
    { date: 'T4', deliveries: 3, successRate: 100 },
    { date: 'T5', deliveries: 6, successRate: 83.3 },
    { date: 'T6', deliveries: 4, successRate: 75 },
    { date: 'T7', deliveries: 2, successRate: 50 },
    { date: 'CN', deliveries: 1, successRate: 100 },
  ]
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

// Component hiển thị đơn hàng đã hoàn thành
const CompletedOrderItem = ({ order }: { order: ShipperOrder }) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
              <img 
                src={order.restaurant.image} 
                alt={order.restaurant.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-sm">{order.restaurant.name}</h3>
              <div className="text-xs text-gray-500">
                {formatTime(order.createdAt)}
              </div>
            </div>
          </div>
          <div className={`text-sm px-2 py-1 rounded-full 
            ${order.deliveryStatus === 'delivered' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'}`}
          >
            {order.deliveryStatus === 'delivered' ? 'Đã giao' : 'Không giao được'}
          </div>
        </div>
        
        <div className="mt-2 text-sm flex justify-between items-center">
          <div>
            {order.items.reduce((sum, item) => sum + item.quantity, 0)} món · {formatCurrency(order.total)}
          </div>
          {order.deliveryStatus === 'delivered' && order.completedTime && (
            <div className="text-xs text-gray-500">
              Thời gian giao: {Math.round((order.completedTime.getTime() - order.startDeliveryTime!.getTime()) / (60 * 1000))} phút
            </div>
          )}
          {order.deliveryStatus === 'failed' && (
            <div className="text-xs text-red-500">
              {order.failureReason}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Custom tooltip cho biểu đồ
const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-primary">
          Số đơn: {payload[0].value}
        </p>
        <p className="text-sm text-green-600">
          Tỷ lệ thành công: {payload[1].value}%
        </p>
      </div>
    );
  }

  return null;
};

export default function ShipperHistory() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [period, setPeriod] = useState('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterParams, setFilterParams] = useState({
    status: 'all',
    paymentMethod: 'all',
    dateRange: 'month',
    minAmount: '',
    maxAmount: '',
    sortBy: 'newest',
  });
  
  // Dữ liệu cho biểu đồ tròn
  const pieData = [
    { name: 'Đã giao', value: mockStats.deliveredCount },
    { name: 'Không giao được', value: mockStats.failedCount },
  ];
  
  const COLORS = ['#4ade80', '#f87171'];
  
  // Lọc đơn hàng hoàn thành theo các tiêu chí
  const filterOrders = () => {
    let filtered = [...mockCompletedOrders];
    
    // Lọc theo thanh tìm kiếm
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toString().includes(searchTerm)
      );
    }
    
    // Lọc theo trạng thái
    if (filterParams.status !== 'all') {
      filtered = filtered.filter(order => order.deliveryStatus === filterParams.status);
    }
    
    // Lọc theo phương thức thanh toán
    if (filterParams.paymentMethod !== 'all') {
      filtered = filtered.filter(order => order.paymentMethod === filterParams.paymentMethod);
    }
    
    // Lọc theo khoảng thời gian
    if (date) {
      const startDate = new Date(date);
      let endDate = new Date(date);
      
      if (filterParams.dateRange === 'day') {
        // Không cần điều chỉnh, đã là ngày hiện tại
      } else if (filterParams.dateRange === 'week') {
        startDate.setDate(startDate.getDate() - 7);
      } else if (filterParams.dateRange === 'month') {
        startDate.setMonth(startDate.getMonth() - 1);
      } else if (filterParams.dateRange === 'year') {
        startDate.setFullYear(startDate.getFullYear() - 1);
      }
      
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= startDate && orderDate <= endDate;
      });
    }
    
    // Lọc theo khoảng giá tiền
    if (filterParams.minAmount) {
      filtered = filtered.filter(order => order.total >= parseInt(filterParams.minAmount));
    }
    
    if (filterParams.maxAmount) {
      filtered = filtered.filter(order => order.total <= parseInt(filterParams.maxAmount));
    }
    
    // Sắp xếp
    if (filterParams.sortBy === 'newest') {
      filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else if (filterParams.sortBy === 'oldest') {
      filtered.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    } else if (filterParams.sortBy === 'highest') {
      filtered.sort((a, b) => b.total - a.total);
    } else if (filterParams.sortBy === 'lowest') {
      filtered.sort((a, b) => a.total - b.total);
    }
    
    return filtered;
  };
  
  const filteredOrders = filterOrders();
  
  // Xử lý sự kiện thay đổi bộ lọc
  const handleFilterChange = (name: string, value: string) => {
    setFilterParams(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Reset tất cả bộ lọc
  const resetFilters = () => {
    setFilterParams({
      status: 'all',
      paymentMethod: 'all',
      dateRange: 'month',
      minAmount: '',
      maxAmount: '',
      sortBy: 'newest',
    });
    setSearchTerm('');
  };
  
  // Tính tổng doanh thu
  const totalRevenue = mockCompletedOrders
    .filter(order => order.deliveryStatus === 'delivered')
    .reduce((sum, order) => sum + order.total, 0);
  
  // Tính tỷ lệ thành công
  const successRate = mockStats.deliveredCount / mockStats.totalDeliveries * 100;
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold hidden md:block">Lịch sử & Thống kê</h1>
      
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
        <Tabs 
          defaultValue="week" 
          className="w-full md:w-auto"
          value={period}
          onValueChange={setPeriod}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="day">Ngày</TabsTrigger>
            <TabsTrigger value="week">Tuần</TabsTrigger>
            <TabsTrigger value="month">Tháng</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="w-full md:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex gap-2 items-center w-full md:w-[200px] justify-start"
              >
                <CalendarIcon className="h-4 w-4" />
                {date ? format(date, 'PP', { locale: vi }) : 'Chọn ngày'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Tìm kiếm đơn hàng..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Popover open={filterOpen} onOpenChange={setFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Bộ lọc
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <h4 className="font-medium">Lọc đơn hàng</h4>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Trạng thái</label>
                <Select 
                  value={filterParams.status} 
                  onValueChange={(value) => handleFilterChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="delivered">Đã giao</SelectItem>
                    <SelectItem value="failed">Không giao được</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Phương thức thanh toán</label>
                <Select 
                  value={filterParams.paymentMethod} 
                  onValueChange={(value) => handleFilterChange('paymentMethod', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phương thức" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="COD">Tiền mặt (COD)</SelectItem>
                    <SelectItem value="Banking">Chuyển khoản</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Khoảng thời gian</label>
                <Select 
                  value={filterParams.dateRange} 
                  onValueChange={(value) => handleFilterChange('dateRange', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn khoảng thời gian" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">1 ngày qua</SelectItem>
                    <SelectItem value="week">1 tuần qua</SelectItem>
                    <SelectItem value="month">1 tháng qua</SelectItem>
                    <SelectItem value="year">1 năm qua</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Khoảng giá (VNĐ)</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Từ"
                    value={filterParams.minAmount}
                    onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Đến"
                    value={filterParams.maxAmount}
                    onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Sắp xếp theo</label>
                <Select 
                  value={filterParams.sortBy} 
                  onValueChange={(value) => handleFilterChange('sortBy', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sắp xếp theo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Mới nhất</SelectItem>
                    <SelectItem value="oldest">Cũ nhất</SelectItem>
                    <SelectItem value="highest">Giá cao nhất</SelectItem>
                    <SelectItem value="lowest">Giá thấp nhất</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between pt-2">
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  Đặt lại
                </Button>
                <Button size="sm" onClick={() => setFilterOpen(false)}>
                  Áp dụng
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tổng số đơn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalDeliveries}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Trong {period === 'day' ? 'ngày' : period === 'week' ? 'tuần' : 'tháng'} này
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ thành công</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockStats.deliveredCount} thành công / {mockStats.failedCount} thất bại
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Thời gian giao trung bình</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.averageDeliveryTime} phút</div>
            <p className="text-xs text-muted-foreground mt-1">
              Từ lúc nhận đến lúc hoàn thành
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Biểu đồ đơn hàng theo ngày</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockStats.dailyStats}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <RechartsTooltip content={<CustomChartTooltip />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="deliveries" name="Số đơn" fill="#3b82f6" />
                  <Bar yAxisId="right" dataKey="successRate" name="Tỷ lệ thành công (%)" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tỷ lệ đơn hàng</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-around w-full text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                <span>Đã giao: {mockStats.deliveredCount} đơn</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                <span>Thất bại: {mockStats.failedCount} đơn</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử giao hàng gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredOrders.length > 0 ? (
            <div className="space-y-2">
              {filteredOrders.map(order => (
                <CompletedOrderItem key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-md">
              <p className="text-gray-500">
                {searchTerm || Object.values(filterParams).some(v => v !== 'all' && v !== 'month' && v !== 'newest' && v !== '') 
                  ? 'Không tìm thấy đơn hàng phù hợp với bộ lọc'
                  : 'Không có đơn hàng nào'}
              </p>
              {(searchTerm || Object.values(filterParams).some(v => v !== 'all' && v !== 'month' && v !== 'newest' && v !== '')) && (
                <Button variant="outline" size="sm" className="mt-4" onClick={resetFilters}>
                  Xóa bộ lọc
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}