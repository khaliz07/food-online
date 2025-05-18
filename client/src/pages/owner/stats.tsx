import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { SalesData, TopSellingItem, Order } from '@/lib/types';
import { Calendar as CalendarIcon, TrendingUp, BarChart2, PieChart as PieChartIcon, Download } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

// Format tiền tệ
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
    .format(amount)
    .replace('₫', 'đ');
};

// Mock data cho doanh thu theo ngày
const mockDailySalesData: SalesData[] = [
  { date: '01/05', revenue: 1250000, orders: 25 },
  { date: '02/05', revenue: 980000, orders: 18 },
  { date: '03/05', revenue: 1520000, orders: 30 },
  { date: '04/05', revenue: 1340000, orders: 27 },
  { date: '05/05', revenue: 1780000, orders: 35 },
  { date: '06/05', revenue: 2150000, orders: 42 },
  { date: '07/05', revenue: 1950000, orders: 38 },
];

// Mock data cho doanh thu theo tuần
const mockWeeklySalesData: SalesData[] = [
  { date: 'Tuần 1', revenue: 7500000, orders: 145 },
  { date: 'Tuần 2', revenue: 8200000, orders: 165 },
  { date: 'Tuần 3', revenue: 9100000, orders: 178 },
  { date: 'Tuần 4', revenue: 10500000, orders: 210 },
];

// Mock data cho doanh thu theo tháng
const mockMonthlySalesData: SalesData[] = [
  { date: 'Tháng 1', revenue: 32000000, orders: 620 },
  { date: 'Tháng 2', revenue: 28500000, orders: 540 },
  { date: 'Tháng 3', revenue: 35000000, orders: 680 },
  { date: 'Tháng 4', revenue: 38500000, orders: 750 },
  { date: 'Tháng 5', revenue: 41000000, orders: 820 },
];

// Mock data cho món ăn bán chạy
const mockTopSellingItems: TopSellingItem[] = [
  { id: 1, name: 'Phở bò đặc biệt', quantity: 120, revenue: 9000000 },
  { id: 3, name: 'Bún bò Huế', quantity: 85, revenue: 6800000 },
  { id: 5, name: 'Lẩu thái hải sản (nhỏ)', quantity: 40, revenue: 10000000 },
  { id: 7, name: 'Cơm gà Hải Nam', quantity: 78, revenue: 9360000 },
  { id: 2, name: 'Chả giò hải sản', quantity: 95, revenue: 3325000 },
];

// Màu sắc cho biểu đồ
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// Định dạng tooltip cho biểu đồ doanh thu
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-primary">
          Doanh thu: {formatCurrency(payload[0].value)}
        </p>
        <p className="text-sm text-gray-600">
          Số đơn: {payload[1]?.payload.orders}
        </p>
      </div>
    );
  }

  return null;
};

// Định dạng tooltip cho biểu đồ món ăn bán chạy
const PieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-sm text-primary">
          Doanh thu: {formatCurrency(payload[0].value)}
        </p>
        <p className="text-sm text-gray-600">
          Số lượng: {payload[0].payload.quantity} món
        </p>
      </div>
    );
  }

  return null;
};

export default function OwnerStats() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [period, setPeriod] = useState('daily');

  // Lấy dữ liệu hiển thị theo kỳ
  const salesData = period === 'daily' 
    ? mockDailySalesData 
    : period === 'weekly' 
      ? mockWeeklySalesData 
      : mockMonthlySalesData;

  // Tổng doanh thu, đơn hàng
  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  // Tính toán % tăng trưởng (giả lập)
  const revenueGrowth = 15.2;
  const orderGrowth = 8.5;

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight hidden md:block mb-6">Thống kê doanh thu</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <Tabs 
          defaultValue="daily" 
          className="w-full md:w-auto"
          value={period}
          onValueChange={setPeriod}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">Ngày</TabsTrigger>
            <TabsTrigger value="weekly">Tuần</TabsTrigger>
            <TabsTrigger value="monthly">Tháng</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex gap-2 items-center w-[200px] justify-start"
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
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>
      
      {/* Thẻ thống kê tổng hợp */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
            <TrendingUp className={`h-4 w-4 ${revenueGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className={revenueGrowth >= 0 ? 'text-green-500' : 'text-red-500'}>
                {revenueGrowth >= 0 ? '+' : ''}{revenueGrowth}%
              </span>{' '}
              so với kỳ trước
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Số đơn hàng</CardTitle>
            <TrendingUp className={`h-4 w-4 ${orderGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className={orderGrowth >= 0 ? 'text-green-500' : 'text-red-500'}>
                {orderGrowth >= 0 ? '+' : ''}{orderGrowth}%
              </span>{' '}
              so với kỳ trước
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Giá trị đơn trung bình</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(averageOrderValue)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Trung bình trên mỗi đơn hàng
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Biểu đồ doanh thu và số đơn */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Biểu đồ doanh thu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis 
                    yAxisId="left"
                    orientation="left"
                    tickFormatter={(value) => `${value / 1000000}tr`}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    yAxisId="left"
                    dataKey="revenue" 
                    name="Doanh thu" 
                    fill="#0088FE" 
                  />
                  <Bar 
                    yAxisId="right"
                    dataKey="orders" 
                    name="Số đơn" 
                    fill="#00C49F" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top món bán chạy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex flex-col">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockTopSellingItems}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      innerRadius={30}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="revenue"
                      nameKey="name"
                    >
                      {mockTopSellingItems.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4">
                <ul className="space-y-1">
                  {mockTopSellingItems.map((item, index) => (
                    <li key={item.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{item.quantity} món</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Top 5 món ăn bán chạy nhất */}
      <Card>
        <CardHeader>
          <CardTitle>Chi tiết món ăn bán chạy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-3">Món ăn</th>
                  <th className="text-right pb-3">Số lượng</th>
                  <th className="text-right pb-3">Doanh thu</th>
                  <th className="text-right pb-3">% Tổng doanh thu</th>
                </tr>
              </thead>
              <tbody>
                {mockTopSellingItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="py-3">{item.name}</td>
                    <td className="text-right py-3">{item.quantity}</td>
                    <td className="text-right py-3">{formatCurrency(item.revenue)}</td>
                    <td className="text-right py-3">
                      {((item.revenue / totalRevenue) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}