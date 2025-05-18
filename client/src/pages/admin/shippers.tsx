import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowUpDown,
  BanIcon,
  CircleCheck,
  Clock,
  Download, 
  ExternalLink,
  Filter, 
  LocateIcon,
  MapPin,
  MoreHorizontal, 
  PhoneOutgoing, 
  RefreshCcw, 
  Star, 
  Search, 
  Truck,
  UserX, 
  Eye,
  Edit,
  CheckCircle,
  Clock4,
  BarChart3,
  Ban,
  User
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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
import { Progress } from '@/components/ui/progress';

// Sample data for shipper
const mockShippersData = [
  {
    id: 1,
    name: 'Nguyễn Văn Giao',
    phone: '0901234567',
    email: 'nguyenvangiao@gmail.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: 'active',
    currentStatus: 'available',
    vehicle: 'Xe máy Honda',
    licensePlate: '59P1-12345',
    area: 'Quận 1, TP.HCM',
    joinDate: '15/01/2023',
    rating: 4.8,
    completedOrders: 345,
    failedOrders: 5,
    successRate: 98.6,
    performance: {
      avgDeliveryTime: 25, // minutes
      timelyDelivery: 92, // percentage
      customerReview: 4.7, // out of 5
    }
  },
  {
    id: 2,
    name: 'Trần Thị Nhanh',
    phone: '0901234568',
    email: 'tranthinha@gmail.com',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    status: 'active',
    currentStatus: 'delivering',
    vehicle: 'Xe máy Yamaha',
    licensePlate: '59P2-54321',
    area: 'Quận 2, TP.HCM',
    joinDate: '20/01/2023',
    rating: 4.9,
    completedOrders: 412,
    failedOrders: 3,
    successRate: 99.3,
    performance: {
      avgDeliveryTime: 22, // minutes
      timelyDelivery: 96, // percentage
      customerReview: 4.9, // out of 5
    }
  },
  {
    id: 3,
    name: 'Lê Văn Xe',
    phone: '0901234569',
    email: 'levanxe@gmail.com',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    status: 'inactive',
    currentStatus: 'offline',
    vehicle: 'Xe máy Honda',
    licensePlate: '59P3-67890',
    area: 'Quận 3, TP.HCM',
    joinDate: '05/02/2023',
    rating: 4.2,
    completedOrders: 156,
    failedOrders: 12,
    successRate: 92.9,
    performance: {
      avgDeliveryTime: 29, // minutes
      timelyDelivery: 85, // percentage
      customerReview: 4.3, // out of 5
    }
  },
  {
    id: 4,
    name: 'Phạm Thị Shipper',
    phone: '0901234570',
    email: 'phamthishipper@gmail.com',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    status: 'active',
    currentStatus: 'available',
    vehicle: 'Xe máy Suzuki',
    licensePlate: '59P4-13579',
    area: 'Quận 4, TP.HCM',
    joinDate: '10/12/2022',
    rating: 4.6,
    completedOrders: 278,
    failedOrders: 8,
    successRate: 97.2,
    performance: {
      avgDeliveryTime: 26, // minutes
      timelyDelivery: 90, // percentage
      customerReview: 4.5, // out of 5
    }
  },
  {
    id: 5,
    name: 'Hoàng Văn Giao',
    phone: '0901234571',
    email: 'hoangvangiao@gmail.com',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    status: 'blocked',
    currentStatus: 'offline',
    vehicle: 'Xe máy Honda',
    licensePlate: '59P5-24680',
    area: 'Quận 5, TP.HCM',
    joinDate: '15/02/2023',
    rating: 3.9,
    completedOrders: 120,
    failedOrders: 18,
    successRate: 87.0,
    performance: {
      avgDeliveryTime: 32, // minutes
      timelyDelivery: 78, // percentage
      customerReview: 3.8, // out of 5
    }
  },
  {
    id: 6,
    name: 'Đỗ Thị Nhanh',
    phone: '0901234572',
    email: 'dothinha@gmail.com',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    status: 'active',
    currentStatus: 'delivering',
    vehicle: 'Xe máy Yamaha',
    licensePlate: '59P6-97531',
    area: 'Quận 6, TP.HCM',
    joinDate: '20/02/2023',
    rating: 4.7,
    completedOrders: 235,
    failedOrders: 6,
    successRate: 97.5,
    performance: {
      avgDeliveryTime: 24, // minutes
      timelyDelivery: 93, // percentage
      customerReview: 4.6, // out of 5
    }
  },
  {
    id: 7,
    name: 'Vũ Văn Shipper',
    phone: '0901234573',
    email: 'vuvanshipper@gmail.com',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    status: 'active',
    currentStatus: 'available',
    vehicle: 'Xe máy Honda',
    licensePlate: '59P7-86420',
    area: 'Quận 7, TP.HCM',
    joinDate: '01/03/2023',
    rating: 4.5,
    completedOrders: 198,
    failedOrders: 7,
    successRate: 96.6,
    performance: {
      avgDeliveryTime: 27, // minutes
      timelyDelivery: 88, // percentage
      customerReview: 4.4, // out of 5
    }
  },
  {
    id: 8,
    name: 'Ngô Thị Giao',
    phone: '0901234574',
    email: 'ngothigiao@gmail.com',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    status: 'active',
    currentStatus: 'available',
    vehicle: 'Xe máy Vespa',
    licensePlate: '59P8-11223',
    area: 'Quận 8, TP.HCM',
    joinDate: '10/03/2023',
    rating: 4.8,
    completedOrders: 267,
    failedOrders: 4,
    successRate: 98.5,
    performance: {
      avgDeliveryTime: 23, // minutes
      timelyDelivery: 94, // percentage
      customerReview: 4.8, // out of 5
    }
  },
  {
    id: 9,
    name: 'Đinh Văn Xe',
    phone: '0901234575',
    email: 'dinhvanxe@gmail.com',
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
    status: 'inactive',
    currentStatus: 'offline',
    vehicle: 'Xe máy Honda',
    licensePlate: '59P9-33445',
    area: 'Quận 9, TP.HCM',
    joinDate: '15/03/2023',
    rating: 4.1,
    completedOrders: 145,
    failedOrders: 15,
    successRate: 90.6,
    performance: {
      avgDeliveryTime: 30, // minutes
      timelyDelivery: 82, // percentage
      customerReview: 4.0, // out of 5
    }
  },
  {
    id: 10,
    name: 'Lý Thị Nhanh',
    phone: '0901234576',
    email: 'lythinha@gmail.com',
    avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
    status: 'active',
    currentStatus: 'delivering',
    vehicle: 'Xe máy Piaggio',
    licensePlate: '59P0-55667',
    area: 'Quận 10, TP.HCM',
    joinDate: '01/01/2023',
    rating: 4.6,
    completedOrders: 320,
    failedOrders: 9,
    successRate: 97.3,
    performance: {
      avgDeliveryTime: 25, // minutes
      timelyDelivery: 91, // percentage
      customerReview: 4.5, // out of 5
    }
  },
];

// Sample data for shipper performance chart
const performanceData = [
  { name: 'T2', deliveries: 23, avgTime: 25 },
  { name: 'T3', deliveries: 28, avgTime: 23 },
  { name: 'T4', deliveries: 25, avgTime: 26 },
  { name: 'T5', deliveries: 30, avgTime: 24 },
  { name: 'T6', deliveries: 35, avgTime: 22 },
  { name: 'T7', deliveries: 40, avgTime: 21 },
  { name: 'CN', deliveries: 30, avgTime: 25 },
];

// Sample data for shipper success rate distribution pie chart
const successRateData = [
  { name: '>95%', value: 65 },
  { name: '90-95%', value: 20 },
  { name: '80-90%', value: 10 },
  { name: '<80%', value: 5 },
];

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ShipperManagement() {
  const { toast } = useToast();
  const [shippers, setShippers] = useState([...mockShippersData]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCurrentStatus, setSelectedCurrentStatus] = useState('all');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [shipperToUpdate, setShipperToUpdate] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  const [blockReason, setBlockReason] = useState('');
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedShipper, setSelectedShipper] = useState<any>(null);
  
  const rowsPerPage = 5;
  
  // Handle sorting
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  // Get sorted and filtered data
  const getSortedAndFilteredData = () => {
    let filteredData = [...mockShippersData];
    
    // Apply search filter
    if (searchTerm) {
      filteredData = filteredData.filter(
        (shipper) =>
          shipper.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shipper.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shipper.phone.includes(searchTerm)
      );
    }
    
    // Apply status filter
    if (selectedStatus !== 'all') {
      filteredData = filteredData.filter(
        (shipper) => shipper.status === selectedStatus
      );
    }
    
    // Apply current status filter
    if (selectedCurrentStatus !== 'all') {
      filteredData = filteredData.filter(
        (shipper) => shipper.currentStatus === selectedCurrentStatus
      );
    }
    
    // Apply sorting
    if (sortConfig !== null) {
      filteredData.sort((a, b) => {
        // Handle nested keys
        const getNestedValue = (obj: any, path: string) => {
          const keys = path.split('.');
          return keys.reduce((o, key) => (o || {})[key], obj);
        };
        
        const aValue = typeof sortConfig.key === 'string' && sortConfig.key.includes('.') 
          ? getNestedValue(a, sortConfig.key) 
          : a[sortConfig.key as keyof typeof a];
        
        const bValue = typeof sortConfig.key === 'string' && sortConfig.key.includes('.') 
          ? getNestedValue(b, sortConfig.key) 
          : b[sortConfig.key as keyof typeof b];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredData;
  };
  
  const sortedAndFilteredData = getSortedAndFilteredData();
  
  // Get data for current tab
  const getDataForCurrentTab = () => {
    switch (activeTabIndex) {
      case 0: // All
        return sortedAndFilteredData;
      case 1: // Active
        return sortedAndFilteredData.filter(shipper => shipper.status === 'active');
      case 2: // Inactive
        return sortedAndFilteredData.filter(shipper => shipper.status === 'inactive');
      case 3: // Blocked
        return sortedAndFilteredData.filter(shipper => shipper.status === 'blocked');
      default:
        return sortedAndFilteredData;
    }
  };
  
  const currentTabData = getDataForCurrentTab();
  
  // Get paginated data
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return currentTabData.slice(startIndex, endIndex);
  };
  
  const paginatedData = getPaginatedData();
  
  // Handle select all rows
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const ids = paginatedData.map((shipper) => shipper.id);
      setSelectedRows(ids);
    } else {
      setSelectedRows([]);
    }
  };
  
  // Handle select single row
  const handleSelectRow = (shipperId: number, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, shipperId]);
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== shipperId));
    }
  };
  
  // Handle update status
  const handleUpdateStatus = (shipperId: number, status: string) => {
    setShipperToUpdate(shipperId);
    setNewStatus(status);
    setIsStatusDialogOpen(true);
  };
  
  // View shipper details
  const viewShipperDetails = (shipperId: number) => {
    const shipper = mockShippersData.find(s => s.id === shipperId);
    setSelectedShipper(shipper);
    setIsDetailOpen(true);
  };
  
  // Confirm status update
  const confirmStatusUpdate = () => {
    if (shipperToUpdate && newStatus) {
      setShippers(
        shippers.map((shipper) =>
          shipper.id === shipperToUpdate
            ? { ...shipper, status: newStatus }
            : shipper
        )
      );
      
      const shipper = shippers.find((s) => s.id === shipperToUpdate);
      
      let message = '';
      if (newStatus === 'active') {
        message = `Tài khoản của "${shipper?.name}" đã được kích hoạt thành công.`;
      } else if (newStatus === 'blocked') {
        message = `Tài khoản của "${shipper?.name}" đã bị chặn thành công.`;
      }
      
      toast({
        title: `Cập nhật trạng thái thành công`,
        description: message,
      });
      
      setIsStatusDialogOpen(false);
      setShipperToUpdate(null);
      setNewStatus('');
      setBlockReason('');
    }
  };
  
  // Handle bulk action
  const handleBulkAction = (action: string) => {
    if (action === 'block') {
      toast({
        title: "Đã chặn shipper",
        description: `${selectedRows.length} shipper đã bị chặn.`,
      });
    } else if (action === 'activate') {
      toast({
        title: "Đã kích hoạt shipper",
        description: `${selectedRows.length} shipper đã được kích hoạt.`,
      });
    }
    
    setSelectedRows([]);
  };
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedCurrentStatus('all');
    setSortConfig(null);
  };
  
  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let variant: "default" | "destructive" | "outline" | "secondary" = "default";
    let label = "";
    let customClass = "";
    
    switch (status) {
      case 'active':
        variant = "default";
        customClass = "bg-green-500";
        label = "Đang hoạt động";
        break;
      case 'inactive':
        variant = "secondary";
        label = "Không hoạt động";
        break;
      case 'blocked':
        variant = "destructive";
        label = "Đã chặn";
        break;
      default:
        variant = "outline";
        label = status;
    }
    
    return <Badge variant={variant} className={customClass}>{label}</Badge>;
  };
  
  // Current Status badge component
  const CurrentStatusBadge = ({ status }: { status: string }) => {
    let variant: "default" | "destructive" | "outline" | "secondary" = "default";
    let label = "";
    let icon = null;
    let customClass = "";
    
    switch (status) {
      case 'available':
        variant = "default";
        customClass = "bg-green-500";
        label = "Đang rảnh";
        icon = <CircleCheck className="h-3.5 w-3.5 mr-1" />;
        break;
      case 'delivering':
        variant = "default";
        customClass = "bg-blue-500";
        label = "Đang giao";
        icon = <Truck className="h-3.5 w-3.5 mr-1" />;
        break;
      case 'offline':
        variant = "secondary";
        label = "Offline";
        icon = <Clock className="h-3.5 w-3.5 mr-1" />;
        break;
      default:
        variant = "outline";
        label = status;
    }
    
    return (
      <Badge variant={variant} className={`${customClass} flex items-center`}>
        {icon}
        <span>{label}</span>
      </Badge>
    );
  };
  
  // Format rating with stars
  const formatRating = (rating: number) => {
    return (
      <div className="flex items-center">
        <span className="mr-1">{rating.toFixed(1)}</span>
        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Quản lý shipper</h1>
          <p className="text-muted-foreground">
            Quản lý và theo dõi hoạt động của các shipper trên hệ thống
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Xuất dữ liệu
          </Button>
          <Button size="sm">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Làm mới
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng số shipper
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockShippersData.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockShippersData.filter(s => s.status === 'active').length} đang hoạt động
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Đang rảnh
            </CardTitle>
            <CircleCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockShippersData.filter(s => s.currentStatus === 'available').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {((mockShippersData.filter(s => s.currentStatus === 'available').length / mockShippersData.filter(s => s.status === 'active').length) * 100).toFixed(1)}% số shipper đang hoạt động
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Đang giao hàng
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockShippersData.filter(s => s.currentStatus === 'delivering').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {((mockShippersData.filter(s => s.currentStatus === 'delivering').length / mockShippersData.filter(s => s.status === 'active').length) * 100).toFixed(1)}% số shipper đang hoạt động
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tỷ lệ giao thành công
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(mockShippersData.reduce((acc, shipper) => acc + shipper.successRate, 0) / mockShippersData.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Trung bình toàn hệ thống
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-8">
        <Card className="md:col-span-5">
          <CardHeader>
            <CardTitle>Hiệu suất giao hàng theo ngày</CardTitle>
            <CardDescription>
              Số lượng đơn giao và thời gian giao trung bình
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="deliveries"
                    name="Số đơn giao"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="avgTime"
                    name="Thời gian trung bình (phút)"
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Phân bố tỷ lệ thành công</CardTitle>
            <CardDescription>
              Phân loại shipper theo tỷ lệ giao thành công
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={successRateData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {successRateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Danh sách shipper</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm shipper..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline-block">Lọc</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Lọc theo</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <div className="p-2">
                    <p className="mb-2 text-sm font-medium">Trạng thái tài khoản</p>
                    <Select
                      value={selectedStatus}
                      onValueChange={setSelectedStatus}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="active">Đang hoạt động</SelectItem>
                        <SelectItem value="inactive">Không hoạt động</SelectItem>
                        <SelectItem value="blocked">Đã chặn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-2">
                    <p className="mb-2 text-sm font-medium">Trạng thái hiện tại</p>
                    <Select
                      value={selectedCurrentStatus}
                      onValueChange={setSelectedCurrentStatus}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="available">Đang rảnh</SelectItem>
                        <SelectItem value="delivering">Đang giao</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <DropdownMenuSeparator />
                  <div className="p-2 flex justify-between">
                    <Button variant="outline" size="sm" onClick={resetFilters}>
                      Đặt lại
                    </Button>
                    <Button size="sm" onClick={() => setIsFilterOpen(false)}>
                      Áp dụng
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs 
            defaultValue="all" 
            onValueChange={(value) => {
              switch(value) {
                case 'all': setActiveTabIndex(0); break;
                case 'active': setActiveTabIndex(1); break;
                case 'inactive': setActiveTabIndex(2); break;
                case 'blocked': setActiveTabIndex(3); break;
              }
            }}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="all">
                Tất cả
                <Badge variant="outline" className="ml-2">
                  {sortedAndFilteredData.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="active">
                Đang hoạt động
                <Badge variant="outline" className="ml-2">
                  {sortedAndFilteredData.filter(s => s.status === 'active').length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="inactive">
                Không hoạt động
                <Badge variant="outline" className="ml-2">
                  {sortedAndFilteredData.filter(s => s.status === 'inactive').length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="blocked">
                Đã chặn
                <Badge variant="outline" className="ml-2">
                  {sortedAndFilteredData.filter(s => s.status === 'blocked').length}
                </Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {renderTable()}
            </TabsContent>
            
            <TabsContent value="active">
              {renderTable()}
            </TabsContent>
            
            <TabsContent value="inactive">
              {renderTable()}
            </TabsContent>
            
            <TabsContent value="blocked">
              {renderTable()}
            </TabsContent>
          </Tabs>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Hiển thị {paginatedData.length} trên {currentTabData.length} shipper
            </div>
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                      }
                    }}
                    aria-disabled={currentPage === 1}
                    className={
                      currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                    }
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.ceil(currentTabData.length / rowsPerPage) }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(index + 1);
                      }}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < Math.ceil(currentTabData.length / rowsPerPage)) {
                        setCurrentPage(currentPage + 1);
                      }
                    }}
                    aria-disabled={
                      currentPage === Math.ceil(currentTabData.length / rowsPerPage)
                    }
                    className={
                      currentPage === Math.ceil(currentTabData.length / rowsPerPage)
                        ? 'pointer-events-none opacity-50'
                        : ''
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
      
      {/* Status update confirmation dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {newStatus === 'active'
                ? 'Kích hoạt shipper'
                : newStatus === 'blocked'
                ? 'Chặn shipper'
                : 'Cập nhật trạng thái'
              }
            </DialogTitle>
            <DialogDescription>
              {newStatus === 'active'
                ? 'Bạn có chắc chắn muốn kích hoạt tài khoản shipper này?'
                : newStatus === 'blocked'
                ? 'Bạn có chắc chắn muốn chặn tài khoản shipper này? Shipper sẽ không thể đăng nhập hoặc nhận đơn hàng.'
                : 'Bạn có chắc chắn muốn cập nhật trạng thái của shipper này?'
              }
            </DialogDescription>
          </DialogHeader>
          
          {newStatus === 'blocked' && (
            <div className="py-4">
              <Textarea
                placeholder="Lý do chặn..."
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsStatusDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button 
              variant={newStatus === 'blocked' ? 'destructive' : 'default'}
              onClick={confirmStatusUpdate}
              disabled={newStatus === 'blocked' && blockReason.trim() === ''}
            >
              {newStatus === 'active'
                ? 'Kích hoạt'
                : newStatus === 'blocked'
                ? 'Chặn'
                : 'Cập nhật'
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Shipper details dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Chi tiết shipper
            </DialogTitle>
            <DialogDescription>
              Thông tin chi tiết và lịch sử hoạt động
            </DialogDescription>
          </DialogHeader>
          
          {selectedShipper && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin cá nhân</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={selectedShipper.avatar} alt={selectedShipper.name} />
                        <AvatarFallback>{selectedShipper.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-lg">{selectedShipper.name}</h3>
                        <div className="flex items-center mt-1 gap-1">
                          <StatusBadge status={selectedShipper.status} />
                          <CurrentStatusBadge status={selectedShipper.currentStatus} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Email:</span>
                        <span>{selectedShipper.email}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Số điện thoại:</span>
                        <div className="flex items-center">
                          <span>{selectedShipper.phone}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 ml-1 text-blue-500"
                          >
                            <PhoneOutgoing className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Phương tiện:</span>
                        <span>{selectedShipper.vehicle}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Biển số xe:</span>
                        <span>{selectedShipper.licensePlate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Khu vực hoạt động:</span>
                        <div className="flex items-center">
                          <span>{selectedShipper.area}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 ml-1 text-blue-500"
                          >
                            <MapPin className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Ngày tham gia:</span>
                        <span>{selectedShipper.joinDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Thống kê hoạt động</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Đánh giá</p>
                        <div className="flex items-center">
                          <span className="font-medium text-lg mr-2">{selectedShipper.rating.toFixed(1)}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-5 w-5 ${
                                  i < Math.floor(selectedShipper.rating) 
                                    ? 'text-yellow-400 fill-yellow-400' 
                                    : i < selectedShipper.rating 
                                      ? 'text-yellow-400 fill-yellow-400 opacity-50' 
                                      : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold">{selectedShipper.successRate}%</span>
                        <p className="text-sm text-muted-foreground">Tỷ lệ thành công</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Số đơn hoàn thành</span>
                          <span className="font-medium">{selectedShipper.completedOrders}</span>
                        </div>
                        <Progress 
                          value={selectedShipper.completedOrders / (selectedShipper.completedOrders + selectedShipper.failedOrders) * 100} 
                          className="h-2" 
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Số đơn thất bại</span>
                          <span className="font-medium">{selectedShipper.failedOrders}</span>
                        </div>
                        <Progress 
                          value={selectedShipper.failedOrders / (selectedShipper.completedOrders + selectedShipper.failedOrders) * 100} 
                          className="h-2 bg-gray-200" 
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4 space-y-4">
                      <h4 className="font-medium">Hiệu suất giao hàng</h4>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Thời gian giao hàng trung bình</span>
                            <span className="font-medium">{selectedShipper.performance.avgDeliveryTime} phút</span>
                          </div>
                          <Progress 
                            value={100 - ((selectedShipper.performance.avgDeliveryTime - 20) / 15) * 100} 
                            className="h-2" 
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Tỷ lệ giao đúng giờ</span>
                            <span className="font-medium">{selectedShipper.performance.timelyDelivery}%</span>
                          </div>
                          <Progress 
                            value={selectedShipper.performance.timelyDelivery} 
                            className="h-2" 
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Đánh giá từ khách hàng</span>
                            <span className="font-medium">{selectedShipper.performance.customerReview}/5</span>
                          </div>
                          <Progress 
                            value={selectedShipper.performance.customerReview / 5 * 100} 
                            className="h-2" 
                          />
                        </div>
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
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mã đơn</TableHead>
                          <TableHead>Thời gian</TableHead>
                          <TableHead>Nhà hàng</TableHead>
                          <TableHead>Địa chỉ giao</TableHead>
                          <TableHead>Trạng thái</TableHead>
                          <TableHead>Thời gian giao</TableHead>
                          <TableHead>Thao tác</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[...Array(5)].map((_, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">#ORD{12345 + i}</TableCell>
                            <TableCell>{new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</TableCell>
                            <TableCell>Nhà hàng mẫu {i + 1}</TableCell>
                            <TableCell className="max-w-[150px] truncate">123 Đường ABC, Quận {i + 1}, TP.HCM</TableCell>
                            <TableCell>
                              <Badge variant={i % 5 === 0 ? "destructive" : "default"} className={i % 5 === 0 ? "" : "bg-green-500"}>
                                {i % 5 === 0 ? "Thất bại" : "Thành công"}
                              </Badge>
                            </TableCell>
                            <TableCell>{20 + i} phút</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Button variant="outline" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Xem tất cả lịch sử
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDetailOpen(false)}
                >
                  Đóng
                </Button>
                
                {selectedShipper.status === 'active' ? (
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      setIsDetailOpen(false);
                      handleUpdateStatus(selectedShipper.id, 'blocked');
                    }}
                    className="gap-2"
                  >
                    <Ban className="h-4 w-4" />
                    Chặn shipper
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setIsDetailOpen(false);
                      handleUpdateStatus(selectedShipper.id, 'active');
                    }}
                    className="gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Kích hoạt shipper
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
  
  function renderTable() {
    return (
      <>
        {selectedRows.length > 0 && (
          <div className="bg-muted/50 p-2 rounded-md mb-4 flex items-center justify-between">
            <p className="text-sm">
              Đã chọn {selectedRows.length} shipper
            </p>
            <div className="flex gap-2">
              {(activeTabIndex === 0 || activeTabIndex === 2 || activeTabIndex === 3) && (
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => handleBulkAction('activate')}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Kích hoạt
                </Button>
              )}
              {(activeTabIndex === 0 || activeTabIndex === 1) && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleBulkAction('block')}
                >
                  <BanIcon className="h-4 w-4 mr-2" />
                  Chặn
                </Button>
              )}
            </div>
          </div>
        )}
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={
                      paginatedData.length > 0 && 
                      selectedRows.length === paginatedData.length
                    }
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead className="w-40">
                  <Button 
                    variant="ghost" 
                    onClick={() => requestSort('name')}
                    className="flex items-center gap-1 font-medium"
                  >
                    Shipper
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Khu vực</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => requestSort('rating')}
                    className="flex items-center gap-1 font-medium"
                  >
                    Đánh giá
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => requestSort('successRate')}
                    className="flex items-center gap-1 font-medium"
                  >
                    Tỷ lệ thành công
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => requestSort('completedOrders')}
                    className="flex items-center gap-1 font-medium"
                  >
                    Đơn đã giao
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((shipper) => (
                  <TableRow key={shipper.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedRows.includes(shipper.id)}
                        onCheckedChange={(checked) => 
                          handleSelectRow(shipper.id, !!checked)
                        }
                        aria-label={`Select ${shipper.name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={shipper.avatar} alt={shipper.name} />
                          <AvatarFallback>{shipper.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{shipper.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{shipper.phone}</TableCell>
                    <TableCell>{shipper.area}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <StatusBadge status={shipper.status} />
                        <CurrentStatusBadge status={shipper.currentStatus} />
                      </div>
                    </TableCell>
                    <TableCell>{formatRating(shipper.rating)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div 
                            className={`h-2.5 rounded-full ${
                              shipper.successRate >= 95 ? 'bg-green-500' : 
                              shipper.successRate >= 90 ? 'bg-blue-500' : 
                              shipper.successRate >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${shipper.successRate}%` }}
                          ></div>
                        </div>
                        <span>{shipper.successRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{shipper.completedOrders}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => viewShipperDetails(shipper.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {shipper.status === 'active' ? (
                            <DropdownMenuItem
                              onClick={() => handleUpdateStatus(shipper.id, 'blocked')}
                              className="text-red-600"
                            >
                              <BanIcon className="h-4 w-4 mr-2" />
                              Chặn
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleUpdateStatus(shipper.id, 'active')}
                              className="text-green-600"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Kích hoạt
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-10">
                    <div className="flex flex-col items-center gap-3">
                      <Truck className="h-10 w-10 text-muted-foreground" />
                      <p className="text-lg font-medium">Không tìm thấy shipper</p>
                      <p className="text-sm text-muted-foreground">
                        Không có shipper nào phù hợp với bộ lọc của bạn.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={resetFilters}
                      >
                        Đặt lại bộ lọc
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </>
    );
  }
}