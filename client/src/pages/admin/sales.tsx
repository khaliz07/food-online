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
  DialogTrigger,
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
  Check,
  ChevronDown, 
  Download, 
  Filter, 
  MoreHorizontal, 
  RefreshCcw, 
  Search, 
  Store, 
  UserCheck,
  UserX, 
  Eye,
  Edit,
  X,
  FileText
} from 'lucide-react';

// Sample data for restaurant owners (salers)
const mockSalersData = [
  {
    id: 1,
    name: 'Nguyễn Văn Chủ',
    email: 'nguyenvana@gmail.com',
    phone: '0901234567',
    restaurant: 'Nhà hàng Phở Ngon',
    orderCount: 120,
    totalRevenue: 32500000,
    status: 'active',
    joinDate: '15/01/2023',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    name: 'Trần Thị Quán',
    email: 'tranthib@gmail.com',
    phone: '0901234568',
    restaurant: 'Quán Cơm Gia Đình',
    orderCount: 85,
    totalRevenue: 24800000,
    status: 'active',
    joinDate: '20/01/2023',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 3,
    name: 'Lê Văn Nhà Hàng',
    email: 'levanc@gmail.com',
    phone: '0901234569',
    restaurant: 'Nhà Hàng Hải Sản Biển Đông',
    orderCount: 65,
    totalRevenue: 48500000,
    status: 'pending',
    joinDate: '05/02/2023',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: 4,
    name: 'Phạm Thị Quán',
    email: 'phamthid@gmail.com',
    phone: '0901234570',
    restaurant: 'Quán Ăn Vặt Ngon',
    orderCount: 210,
    totalRevenue: 18650000,
    status: 'active',
    joinDate: '10/12/2022',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: 5,
    name: 'Hoàng Văn Đầu Bếp',
    email: 'hoangvane@gmail.com',
    phone: '0901234571',
    restaurant: 'Nhà Hàng Ẩm Thực Á Âu',
    orderCount: 95,
    totalRevenue: 67850000,
    status: 'blocked',
    joinDate: '15/02/2023',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    id: 6,
    name: 'Đỗ Thị Nhà Hàng',
    email: 'dothif@gmail.com',
    phone: '0901234572',
    restaurant: 'Nhà Hàng Chay Tịnh Tâm',
    orderCount: 78,
    totalRevenue: 22450000,
    status: 'active',
    joinDate: '20/02/2023',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
  {
    id: 7,
    name: 'Vũ Văn Món Ăn',
    email: 'vuvang@gmail.com',
    phone: '0901234573',
    restaurant: 'Quán Lẩu Wang Wang',
    orderCount: 112,
    totalRevenue: 41250000,
    status: 'pending',
    joinDate: '01/03/2023',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
  },
  {
    id: 8,
    name: 'Ngô Thị Đầu Bếp',
    email: 'ngothih@gmail.com',
    phone: '0901234574',
    restaurant: 'Nhà Hàng BBQ Hàn Quốc',
    orderCount: 145,
    totalRevenue: 58950000,
    status: 'active',
    joinDate: '10/03/2023',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    id: 9,
    name: 'Đinh Văn Quán',
    email: 'dinhvani@gmail.com',
    phone: '0901234575',
    restaurant: 'Quán Cà Phê Đinh',
    orderCount: 320,
    totalRevenue: 12850000,
    status: 'pending',
    joinDate: '15/03/2023',
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
  },
  {
    id: 10,
    name: 'Lý Thị Nhà Hàng',
    email: 'lythik@gmail.com',
    phone: '0901234576',
    restaurant: 'Nhà Hàng Dimsum Lý',
    orderCount: 98,
    totalRevenue: 39850000,
    status: 'active',
    joinDate: '01/01/2023',
    avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
  },
];

// Sample pending saler details
const mockPendingDetails = {
  id: 3,
  name: 'Lê Văn Nhà Hàng',
  email: 'levanc@gmail.com',
  phone: '0901234569',
  restaurant: {
    name: 'Nhà Hàng Hải Sản Biển Đông',
    address: '123 Đường Nguyễn Trãi, Quận 1, TP.HCM',
    description: 'Chuyên các món hải sản tươi sống, hải sản nhập khẩu từ các vùng biển sạch.',
    cuisineType: 'Hải sản',
    openHours: '10:00 - 22:00',
    priceRange: '150,000đ - 500,000đ',
    photos: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    ],
    documents: [
      {
        name: 'Giấy phép kinh doanh',
        url: '#',
        verified: true
      },
      {
        name: 'Chứng nhận an toàn thực phẩm',
        url: '#',
        verified: false
      },
      {
        name: 'Hợp đồng thuê mặt bằng',
        url: '#',
        verified: true
      }
    ]
  },
  owner: {
    idCard: '123456789012',
    address: '456 Đường Lê Lợi, Quận 1, TP.HCM',
    taxCode: '0123456789',
    bankAccount: '9876543210',
    bankName: 'VietcomBank',
    notes: 'Đã kinh doanh nhà hàng được 5 năm.'
  },
  submittedDate: '05/02/2023',
  status: 'pending'
};

// Format currency in VND
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
    .format(amount)
    .replace('₫', 'đ');
};

export default function SalerManagement() {
  const { toast } = useToast();
  const [salers, setSalers] = useState([...mockSalersData]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [salerToUpdate, setSalerToUpdate] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  const [rejectReason, setRejectReason] = useState('');
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isPendingDetailOpen, setIsPendingDetailOpen] = useState(false);
  const [selectedPendingSaler, setSelectedPendingSaler] = useState<any>(null);
  
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
    let filteredData = [...mockSalersData];
    
    // Apply search filter
    if (searchTerm) {
      filteredData = filteredData.filter(
        (saler) =>
          saler.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          saler.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          saler.phone.includes(searchTerm) ||
          saler.restaurant.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (selectedStatus !== 'all') {
      filteredData = filteredData.filter(
        (saler) => saler.status === selectedStatus
      );
    }
    
    // Apply sorting
    if (sortConfig !== null) {
      filteredData.sort((a, b) => {
        if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
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
      case 1: // Pending
        return sortedAndFilteredData.filter(saler => saler.status === 'pending');
      case 2: // Active
        return sortedAndFilteredData.filter(saler => saler.status === 'active');
      case 3: // Blocked
        return sortedAndFilteredData.filter(saler => saler.status === 'blocked');
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
      const ids = paginatedData.map((saler) => saler.id);
      setSelectedRows(ids);
    } else {
      setSelectedRows([]);
    }
  };
  
  // Handle select single row
  const handleSelectRow = (salerId: number, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, salerId]);
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== salerId));
    }
  };
  
  // Handle update status
  const handleUpdateStatus = (salerId: number, status: string) => {
    setSalerToUpdate(salerId);
    setNewStatus(status);
    setIsStatusDialogOpen(true);
  };
  
  // Confirm status update
  const confirmStatusUpdate = () => {
    if (salerToUpdate && newStatus) {
      setSalers(
        salers.map((saler) =>
          saler.id === salerToUpdate
            ? { ...saler, status: newStatus }
            : saler
        )
      );
      
      const saler = salers.find((s) => s.id === salerToUpdate);
      
      let message = '';
      if (newStatus === 'active') {
        message = `Tài khoản của "${saler?.name}" đã được kích hoạt thành công.`;
      } else if (newStatus === 'blocked') {
        message = `Tài khoản của "${saler?.name}" đã bị chặn thành công.`;
      } else if (newStatus === 'rejected') {
        message = `Đã từ chối yêu cầu của "${saler?.name}" với lý do: ${rejectReason}.`;
      }
      
      toast({
        title: `Cập nhật trạng thái thành công`,
        description: message,
      });
      
      setIsStatusDialogOpen(false);
      setSalerToUpdate(null);
      setNewStatus('');
      setRejectReason('');
    }
  };
  
  // Handle bulk action
  const handleBulkAction = (action: string) => {
    if (action === 'block') {
      toast({
        title: "Đã chặn nhà hàng",
        description: `${selectedRows.length} nhà hàng đã bị chặn.`,
      });
    } else if (action === 'activate') {
      toast({
        title: "Đã kích hoạt nhà hàng",
        description: `${selectedRows.length} nhà hàng đã được kích hoạt.`,
      });
    } else if (action === 'approve') {
      toast({
        title: "Đã duyệt nhà hàng",
        description: `${selectedRows.length} nhà hàng đã được duyệt.`,
      });
    }
    
    setSelectedRows([]);
  };
  
  // View pending saler details
  const viewPendingDetails = (salerId: number) => {
    setSelectedPendingSaler(mockPendingDetails);
    setIsPendingDetailOpen(true);
  };
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSortConfig(null);
  };
  
  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let variant: "default" | "destructive" | "outline" | "secondary" | null = null;
    let label = "";
    
    switch (status) {
      case 'active':
        variant = "default";
        label = "Đang hoạt động";
        break;
      case 'pending':
        variant = "secondary";
        label = "Chờ duyệt";
        break;
      case 'blocked':
        variant = "destructive";
        label = "Đã chặn";
        break;
      case 'rejected':
        variant = "outline";
        label = "Đã từ chối";
        break;
      default:
        variant = "outline";
        label = status;
    }
    
    return <Badge variant={variant}>{label}</Badge>;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Quản lý chủ quán</h1>
          <p className="text-muted-foreground">
            Quản lý và duyệt các chủ quán, nhà hàng trên hệ thống
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
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Danh sách chủ quán</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm chủ quán, nhà hàng..."
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
                    <p className="mb-2 text-sm font-medium">Trạng thái</p>
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
                        <SelectItem value="pending">Chờ duyệt</SelectItem>
                        <SelectItem value="blocked">Đã chặn</SelectItem>
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
                case 'pending': setActiveTabIndex(1); break;
                case 'active': setActiveTabIndex(2); break;
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
              <TabsTrigger value="pending">
                Chờ duyệt
                <Badge variant="outline" className="ml-2">
                  {sortedAndFilteredData.filter(s => s.status === 'pending').length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="active">
                Đang hoạt động
                <Badge variant="outline" className="ml-2">
                  {sortedAndFilteredData.filter(s => s.status === 'active').length}
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
            
            <TabsContent value="pending">
              {renderTable()}
            </TabsContent>
            
            <TabsContent value="active">
              {renderTable()}
            </TabsContent>
            
            <TabsContent value="blocked">
              {renderTable()}
            </TabsContent>
          </Tabs>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Hiển thị {paginatedData.length} trên {currentTabData.length} chủ quán
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
                ? 'Kích hoạt nhà hàng'
                : newStatus === 'blocked'
                ? 'Chặn nhà hàng'
                : newStatus === 'rejected'
                ? 'Từ chối yêu cầu'
                : 'Cập nhật trạng thái'
              }
            </DialogTitle>
            <DialogDescription>
              {newStatus === 'active'
                ? 'Bạn có chắc chắn muốn kích hoạt nhà hàng này?'
                : newStatus === 'blocked'
                ? 'Bạn có chắc chắn muốn chặn nhà hàng này? Nhà hàng sẽ không thể hoạt động cho đến khi được kích hoạt lại.'
                : newStatus === 'rejected'
                ? 'Vui lòng cung cấp lý do từ chối yêu cầu này.'
                : 'Bạn có chắc chắn muốn cập nhật trạng thái của nhà hàng này?'
              }
            </DialogDescription>
          </DialogHeader>
          
          {newStatus === 'rejected' && (
            <div className="py-4">
              <Textarea
                placeholder="Lý do từ chối..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
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
              variant={newStatus === 'blocked' || newStatus === 'rejected' ? 'destructive' : 'default'}
              onClick={confirmStatusUpdate}
              disabled={newStatus === 'rejected' && rejectReason.trim() === ''}
            >
              {newStatus === 'active'
                ? 'Kích hoạt'
                : newStatus === 'blocked'
                ? 'Chặn'
                : newStatus === 'rejected'
                ? 'Từ chối'
                : 'Cập nhật'
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Pending saler details dialog */}
      <Dialog open={isPendingDetailOpen} onOpenChange={setIsPendingDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Chi tiết yêu cầu đăng ký nhà hàng
            </DialogTitle>
            <DialogDescription>
              Xem xét thông tin và quyết định phê duyệt hoặc từ chối
            </DialogDescription>
          </DialogHeader>
          
          {selectedPendingSaler && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin chủ quán</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage 
                          src={mockSalersData.find(s => s.id === selectedPendingSaler.id)?.avatar} 
                          alt={selectedPendingSaler.name} 
                        />
                        <AvatarFallback>{selectedPendingSaler.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{selectedPendingSaler.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Đăng ký: {selectedPendingSaler.submittedDate}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Email:</span>
                        <span>{selectedPendingSaler.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Số điện thoại:</span>
                        <span>{selectedPendingSaler.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">CMND/CCCD:</span>
                        <span>{selectedPendingSaler.owner.idCard}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Địa chỉ:</span>
                        <span>{selectedPendingSaler.owner.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Mã số thuế:</span>
                        <span>{selectedPendingSaler.owner.taxCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Tài khoản ngân hàng:</span>
                        <span>{selectedPendingSaler.owner.bankAccount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Ngân hàng:</span>
                        <span>{selectedPendingSaler.owner.bankName}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Ghi chú:</h4>
                      <p className="text-sm">{selectedPendingSaler.owner.notes}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin nhà hàng</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <h3 className="font-medium text-lg">{selectedPendingSaler.restaurant.name}</h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Địa chỉ:</span>
                        <span>{selectedPendingSaler.restaurant.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Loại hình ẩm thực:</span>
                        <span>{selectedPendingSaler.restaurant.cuisineType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Giờ mở cửa:</span>
                        <span>{selectedPendingSaler.restaurant.openHours}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Phạm vi giá:</span>
                        <span>{selectedPendingSaler.restaurant.priceRange}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Mô tả:</h4>
                      <p className="text-sm">{selectedPendingSaler.restaurant.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Hình ảnh nhà hàng:</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {selectedPendingSaler.restaurant.photos.map((photo: string, index: number) => (
                          <div key={index} className="aspect-video rounded-md overflow-hidden">
                            <img 
                              src={photo} 
                              alt={`Restaurant photo ${index + 1}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Giấy tờ pháp lý</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedPendingSaler.restaurant.documents.map((doc: any, index: number) => (
                      <div key={index} className="border rounded-md p-4">
                        <div className="flex items-center mb-2">
                          <FileText className="h-6 w-6 text-blue-500 mr-2" />
                          <h4 className="font-medium">{doc.name}</h4>
                        </div>
                        <div className="flex items-center mt-2 justify-between">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex gap-1"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            Xem
                          </Button>
                          <Badge variant={doc.verified ? "default" : "outline"}>
                            {doc.verified ? 'Đã xác minh' : 'Chưa xác minh'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsPendingDetailOpen(false)}
                >
                  Đóng
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => {
                    setIsPendingDetailOpen(false);
                    handleUpdateStatus(selectedPendingSaler.id, 'rejected');
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Từ chối
                </Button>
                <Button
                  onClick={() => {
                    setIsPendingDetailOpen(false);
                    handleUpdateStatus(selectedPendingSaler.id, 'active');
                  }}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Phê duyệt
                </Button>
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
              Đã chọn {selectedRows.length} chủ quán
            </p>
            <div className="flex gap-2">
              {activeTabIndex === 1 && (
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => handleBulkAction('approve')}
                >
                  <UserCheck className="h-4 w-4 mr-2" />
                  Duyệt
                </Button>
              )}
              {(activeTabIndex === 0 || activeTabIndex === 2) && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleBulkAction('block')}
                >
                  <UserX className="h-4 w-4 mr-2" />
                  Chặn
                </Button>
              )}
              {(activeTabIndex === 0 || activeTabIndex === 3) && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkAction('activate')}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Kích hoạt
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
                    Chủ quán
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => requestSort('restaurant')}
                    className="flex items-center gap-1 font-medium"
                  >
                    Nhà hàng
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => requestSort('orderCount')}
                    className="flex items-center gap-1 font-medium"
                  >
                    Số đơn
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => requestSort('totalRevenue')}
                    className="flex items-center gap-1 font-medium"
                  >
                    Doanh thu
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((saler) => (
                  <TableRow key={saler.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedRows.includes(saler.id)}
                        onCheckedChange={(checked) => 
                          handleSelectRow(saler.id, !!checked)
                        }
                        aria-label={`Select ${saler.name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={saler.avatar} alt={saler.name} />
                          <AvatarFallback>{saler.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{saler.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{saler.restaurant}</TableCell>
                    <TableCell>{saler.email}</TableCell>
                    <TableCell>{saler.orderCount}</TableCell>
                    <TableCell>{formatCurrency(saler.totalRevenue)}</TableCell>
                    <TableCell>
                      <StatusBadge status={saler.status} />
                    </TableCell>
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
                          {saler.status === 'pending' ? (
                            <>
                              <DropdownMenuItem onClick={() => viewPendingDetails(saler.id)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Xem chi tiết
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleUpdateStatus(saler.id, 'active')}
                                className="text-green-600"
                              >
                                <Check className="h-4 w-4 mr-2" />
                                Phê duyệt
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleUpdateStatus(saler.id, 'rejected')}
                                className="text-red-600"
                              >
                                <X className="h-4 w-4 mr-2" />
                                Từ chối
                              </DropdownMenuItem>
                            </>
                          ) : (
                            <>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                Xem chi tiết
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Sửa thông tin
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {saler.status === 'active' ? (
                                <DropdownMenuItem
                                  onClick={() => handleUpdateStatus(saler.id, 'blocked')}
                                  className="text-red-600"
                                >
                                  <UserX className="h-4 w-4 mr-2" />
                                  Chặn
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() => handleUpdateStatus(saler.id, 'active')}
                                  className="text-green-600"
                                >
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Kích hoạt
                                </DropdownMenuItem>
                              )}
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    <div className="flex flex-col items-center gap-3">
                      <Store className="h-10 w-10 text-muted-foreground" />
                      <p className="text-lg font-medium">Không tìm thấy chủ quán</p>
                      <p className="text-sm text-muted-foreground">
                        Không có chủ quán nào phù hợp với bộ lọc của bạn.
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