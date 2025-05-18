import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  ArrowRight, 
  ArrowUpRight, 
  BarChart2, 
  CheckCircle, 
  DollarSign, 
  Download, 
  ShoppingCart, 
  Store, 
  Truck, 
  Users, 
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

// Sample data for analytics
const analyticsData = {
  users: {
    total: 12548,
    newToday: 156,
    growthRate: 12.5, // percentage
  },
  restaurants: {
    total: 285,
    newToday: 8,
    growthRate: 5.2,
    pendingApproval: 3,
  },
  shippers: {
    total: 420,
    newToday: 15,
    growthRate: 8.7,
    active: 310,
    inactive: 110,
  },
  orders: {
    totalToday: 845,
    completedToday: 780,
    cancelledToday: 65,
    growthRate: 15.3,
  },
  revenue: {
    today: 28500000, // in VND
    thisWeek: 156500000,
    thisMonth: 653200000,
    growthRateMonth: 18.5,
  },
};

// Sample data for weekly revenue chart
const weeklyRevenueData = [
  { name: 'T2', revenue: 45600000 },
  { name: 'T3', revenue: 52300000 },
  { name: 'T4', revenue: 48700000 },
  { name: 'T5', revenue: 61200000 },
  { name: 'T6', revenue: 75400000 },
  { name: 'T7', revenue: 89500000 },
  { name: 'CN', revenue: 65800000 },
];

// Sample data for monthly order stats
const monthlyOrderData = [
  { name: '01/04', orders: 320, completed: 300, cancelled: 20 },
  { name: '02/04', orders: 345, completed: 325, cancelled: 20 },
  { name: '03/04', orders: 380, completed: 350, cancelled: 30 },
  { name: '04/04', orders: 395, completed: 375, cancelled: 20 },
  { name: '05/04', orders: 410, completed: 390, cancelled: 20 },
  { name: '06/04', orders: 450, completed: 420, cancelled: 30 },
  { name: '07/04', orders: 480, completed: 450, cancelled: 30 },
  { name: '08/04', orders: 470, completed: 445, cancelled: 25 },
  { name: '09/04', orders: 490, completed: 465, cancelled: 25 },
  { name: '10/04', orders: 510, completed: 480, cancelled: 30 },
  { name: '11/04', orders: 530, completed: 500, cancelled: 30 },
  { name: '12/04', orders: 525, completed: 495, cancelled: 30 },
  { name: '13/04', orders: 540, completed: 510, cancelled: 30 },
  { name: '14/04', orders: 560, completed: 530, cancelled: 30 },
];

// Sample data for popular food categories
const popularCategoriesData = [
  { name: 'Đồ ăn nhanh', value: 35 },
  { name: 'Món Việt', value: 30 },
  { name: 'Đồ uống', value: 15 },
  { name: 'Bánh ngọt', value: 10 },
  { name: 'Món Á', value: 10 },
];

// Sample data for recent orders
const recentOrdersData = [
  { 
    id: 12345, 
    customer: 'Nguyễn Văn A', 
    restaurant: 'Nhà hàng ABC', 
    total: 245000, 
    status: 'completed', 
    time: '15:30' 
  },
  { 
    id: 12344, 
    customer: 'Trần Thị B', 
    restaurant: 'Quán CDE', 
    total: 187000, 
    status: 'processing', 
    time: '15:25' 
  },
  { 
    id: 12343, 
    customer: 'Lê Văn C', 
    restaurant: 'Nhà hàng XYZ', 
    total: 352000, 
    status: 'completed', 
    time: '15:20' 
  },
  { 
    id: 12342, 
    customer: 'Phạm Thị D', 
    restaurant: 'Quán EFG', 
    total: 156000, 
    status: 'cancelled', 
    time: '15:15' 
  },
  { 
    id: 12341, 
    customer: 'Hoàng Văn E', 
    restaurant: 'Nhà hàng HIJ', 
    total: 278000, 
    status: 'completed', 
    time: '15:10' 
  },
];

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// Format currency in VND
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
    .format(amount)
    .replace('₫', 'đ');
};

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  description, 
  trend, 
  trendValue,
  color = 'text-primary'
}: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode; 
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: number;
  color?: string;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <div className={`${color} bg-primary/10 p-2 rounded-full`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            {trend === 'up' && (
              <Badge variant="default" className="gap-1 px-1.5 py-0 bg-green-500">
                <ArrowUpRight className="h-3.5 w-3.5" />
                <span>{trendValue}%</span>
              </Badge>
            )}
            {trend === 'down' && (
              <Badge variant="destructive" className="gap-1 px-1.5 py-0">
                <ArrowUpRight className="h-3.5 w-3.5 rotate-180" />
                <span>{trendValue}%</span>
              </Badge>
            )}
            <span className="text-xs text-muted-foreground ml-1">so với tháng trước</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function AdminDashboard() {
  const [revenueTab, setRevenueTab] = useState('week');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tổng quan</h1>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Tải xuống báo cáo
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Tổng số người dùng"
          value={analyticsData.users.total.toLocaleString()}
          icon={<Users className="h-4 w-4" />}
          description={`+${analyticsData.users.newToday} mới hôm nay`}
          trend="up"
          trendValue={analyticsData.users.growthRate}
        />
        
        <StatsCard
          title="Tổng số cửa hàng"
          value={analyticsData.restaurants.total.toLocaleString()}
          icon={<Store className="h-4 w-4" />}
          description={`${analyticsData.restaurants.pendingApproval} đang chờ duyệt`}
          trend="up"
          trendValue={analyticsData.restaurants.growthRate}
        />
        
        <StatsCard
          title="Tổng số shipper"
          value={analyticsData.shippers.total.toLocaleString()}
          icon={<Truck className="h-4 w-4" />}
          description={`${analyticsData.shippers.active} đang hoạt động`}
          trend="up"
          trendValue={analyticsData.shippers.growthRate}
        />
        
        <StatsCard
          title="Đơn hàng hôm nay"
          value={analyticsData.orders.totalToday.toLocaleString()}
          icon={<ShoppingCart className="h-4 w-4" />}
          description={`${analyticsData.orders.completedToday} đã hoàn thành`}
          trend="up"
          trendValue={analyticsData.orders.growthRate}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Doanh thu</CardTitle>
              <CardDescription>
                Tổng doanh thu hôm nay: {formatCurrency(analyticsData.revenue.today)}
              </CardDescription>
            </div>
            
            <Tabs
              value={revenueTab}
              onValueChange={setRevenueTab}
              className="ml-auto"
            >
              <TabsList className="grid w-[200px] grid-cols-3">
                <TabsTrigger value="day">Ngày</TabsTrigger>
                <TabsTrigger value="week">Tuần</TabsTrigger>
                <TabsTrigger value="month">Tháng</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={weeklyRevenueData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => 
                      `${Math.round(value / 1000000)}Tr`
                    } 
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), "Doanh thu"]} 
                    labelFormatter={(label) => `Ngày: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    fillOpacity={0.3} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Loại món ăn phổ biến</CardTitle>
            <CardDescription>
              Phân loại theo lượng đơn đặt hàng
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center">
              <div className="w-full max-w-[300px]">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={popularCategoriesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {popularCategoriesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Đơn hàng theo ngày</CardTitle>
            <CardDescription>
              Số lượng đơn hàng hoàn thành và hủy theo ngày
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyOrderData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" name="Hoàn thành" stackId="a" fill="#0088FE" />
                  <Bar dataKey="cancelled" name="Đã hủy" stackId="a" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Đơn hàng gần đây</CardTitle>
            <CardDescription>
              Cập nhật theo thời gian thực
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrdersData.map((order) => (
                <div key={order.id} className="flex items-center space-x-4">
                  <div className="rounded-full h-8 w-8 flex items-center justify-center">
                    {order.status === 'completed' && (
                      <CheckCircle className="h-7 w-7 text-green-500" />
                    )}
                    {order.status === 'processing' && (
                      <BarChart2 className="h-7 w-7 text-blue-500" />
                    )}
                    {order.status === 'cancelled' && (
                      <X className="h-7 w-7 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Đơn hàng #{order.id}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.customer} - {order.restaurant}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {formatCurrency(order.total)}
                    </p>
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-6" size="sm">
                <span>Xem tất cả đơn hàng</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}