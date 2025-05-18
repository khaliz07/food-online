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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowUpDown,
  ChevronDown, 
  Download, 
  Filter, 
  MoreHorizontal, 
  RefreshCcw, 
  Search, 
  User, 
  UserX, 
  Eye,
  Edit
} from 'lucide-react';

// Sample data for users
const mockUsersData = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@gmail.com',
    phone: '0901234567',
    orderCount: 32,
    totalSpent: 5450000,
    status: 'active',
    joinDate: '15/01/2023',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@gmail.com',
    phone: '0901234568',
    orderCount: 28,
    totalSpent: 4280000,
    status: 'active',
    joinDate: '20/01/2023',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@gmail.com',
    phone: '0901234569',
    orderCount: 15,
    totalSpent: 2150000,
    status: 'inactive',
    joinDate: '05/02/2023',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    email: 'phamthid@gmail.com',
    phone: '0901234570',
    orderCount: 45,
    totalSpent: 7650000,
    status: 'active',
    joinDate: '10/12/2022',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: 5,
    name: 'Hoàng Văn E',
    email: 'hoangvane@gmail.com',
    phone: '0901234571',
    orderCount: 12,
    totalSpent: 1850000,
    status: 'blocked',
    joinDate: '15/02/2023',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    id: 6,
    name: 'Đỗ Thị F',
    email: 'dothif@gmail.com',
    phone: '0901234572',
    orderCount: 22,
    totalSpent: 3450000,
    status: 'active',
    joinDate: '20/02/2023',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
  {
    id: 7,
    name: 'Vũ Văn G',
    email: 'vuvang@gmail.com',
    phone: '0901234573',
    orderCount: 8,
    totalSpent: 1250000,
    status: 'active',
    joinDate: '01/03/2023',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
  },
  {
    id: 8,
    name: 'Ngô Thị H',
    email: 'ngothih@gmail.com',
    phone: '0901234574',
    orderCount: 18,
    totalSpent: 2950000,
    status: 'active',
    joinDate: '10/03/2023',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    id: 9,
    name: 'Đinh Văn I',
    email: 'dinhvani@gmail.com',
    phone: '0901234575',
    orderCount: 5,
    totalSpent: 850000,
    status: 'inactive',
    joinDate: '15/03/2023',
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
  },
  {
    id: 10,
    name: 'Lý Thị K',
    email: 'lythik@gmail.com',
    phone: '0901234576',
    orderCount: 30,
    totalSpent: 4850000,
    status: 'active',
    joinDate: '01/01/2023',
    avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
  },
];

// Format currency in VND
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
    .format(amount)
    .replace('₫', 'đ');
};

export default function UserManagement() {
  const { toast } = useToast();
  const [users, setUsers] = useState([...mockUsersData]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
  const [userToBlock, setUserToBlock] = useState<number | null>(null);
  
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
    let filteredData = [...mockUsersData];
    
    // Apply search filter
    if (searchTerm) {
      filteredData = filteredData.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone.includes(searchTerm)
      );
    }
    
    // Apply status filter
    if (selectedStatus !== 'all') {
      filteredData = filteredData.filter(
        (user) => user.status === selectedStatus
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
  
  // Get paginated data
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return sortedAndFilteredData.slice(startIndex, endIndex);
  };
  
  const paginatedData = getPaginatedData();
  
  // Handle select all rows
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const ids = paginatedData.map((user) => user.id);
      setSelectedRows(ids);
    } else {
      setSelectedRows([]);
    }
  };
  
  // Handle select single row
  const handleSelectRow = (userId: number, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, userId]);
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== userId));
    }
  };
  
  // Handle block user
  const handleBlockUser = (userId: number) => {
    setUserToBlock(userId);
    setIsBlockDialogOpen(true);
  };
  
  // Confirm block user
  const confirmBlockUser = () => {
    if (userToBlock) {
      setUsers(
        users.map((user) =>
          user.id === userToBlock
            ? { ...user, status: user.status === 'blocked' ? 'active' : 'blocked' }
            : user
        )
      );
      
      const user = users.find((u) => u.id === userToBlock);
      const newStatus = user?.status === 'blocked' ? 'active' : 'blocked';
      
      toast({
        title: `Người dùng đã được ${newStatus === 'blocked' ? 'chặn' : 'kích hoạt'}`,
        description: `Tài khoản của "${user?.name}" đã được ${
          newStatus === 'blocked' ? 'chặn thành công' : 'kích hoạt thành công'
        }.`,
      });
      
      setIsBlockDialogOpen(false);
      setUserToBlock(null);
    }
  };
  
  // Handle bulk action
  const handleBulkAction = (action: string) => {
    if (action === 'block') {
      toast({
        title: "Đã chặn người dùng",
        description: `${selectedRows.length} người dùng đã được chặn.`,
      });
    } else if (action === 'activate') {
      toast({
        title: "Đã kích hoạt người dùng",
        description: `${selectedRows.length} người dùng đã được kích hoạt.`,
      });
    }
    
    setSelectedRows([]);
  };
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
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
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
          <p className="text-muted-foreground">
            Quản lý và theo dõi người dùng trên hệ thống
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
            <CardTitle>Danh sách người dùng</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm người dùng..."
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
                        <SelectItem value="inactive">Không hoạt động</SelectItem>
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
          {selectedRows.length > 0 && (
            <div className="bg-muted/50 p-2 rounded-md mb-4 flex items-center justify-between">
              <p className="text-sm">
                Đã chọn {selectedRows.length} người dùng
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkAction('activate')}
                >
                  Kích hoạt
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleBulkAction('block')}
                >
                  Chặn
                </Button>
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
                      Người dùng
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Số điện thoại</TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      onClick={() => requestSort('orderCount')}
                      className="flex items-center gap-1 font-medium"
                    >
                      Số đơn hàng
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      onClick={() => requestSort('totalSpent')}
                      className="flex items-center gap-1 font-medium"
                    >
                      Tổng chi tiêu
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày tham gia</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedRows.includes(user.id)}
                          onCheckedChange={(checked) => 
                            handleSelectRow(user.id, !!checked)
                          }
                          aria-label={`Select ${user.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.orderCount}</TableCell>
                      <TableCell>{formatCurrency(user.totalSpent)}</TableCell>
                      <TableCell>
                        <StatusBadge status={user.status} />
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
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
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleBlockUser(user.id)}
                              className={
                                user.status === 'blocked' ? 'text-green-600' : 'text-red-600'
                              }
                            >
                              <UserX className="h-4 w-4 mr-2" />
                              {user.status === 'blocked' ? 'Kích hoạt' : 'Chặn'}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-10">
                      <div className="flex flex-col items-center gap-3">
                        <User className="h-10 w-10 text-muted-foreground" />
                        <p className="text-lg font-medium">Không tìm thấy người dùng</p>
                        <p className="text-sm text-muted-foreground">
                          Không có người dùng nào phù hợp với bộ lọc của bạn.
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
          
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Hiển thị {paginatedData.length} trên {sortedAndFilteredData.length} người dùng
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
                
                {Array.from({ length: Math.ceil(sortedAndFilteredData.length / rowsPerPage) }).map((_, index) => (
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
                      if (currentPage < Math.ceil(sortedAndFilteredData.length / rowsPerPage)) {
                        setCurrentPage(currentPage + 1);
                      }
                    }}
                    aria-disabled={
                      currentPage === Math.ceil(sortedAndFilteredData.length / rowsPerPage)
                    }
                    className={
                      currentPage === Math.ceil(sortedAndFilteredData.length / rowsPerPage)
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
      
      {/* Block user confirmation dialog */}
      <Dialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {users.find((u) => u.id === userToBlock)?.status === 'blocked'
                ? 'Kích hoạt người dùng'
                : 'Chặn người dùng'
              }
            </DialogTitle>
            <DialogDescription>
              {users.find((u) => u.id === userToBlock)?.status === 'blocked'
                ? 'Bạn có chắc chắn muốn kích hoạt tài khoản này? Người dùng sẽ có thể đăng nhập và sử dụng dịch vụ.'
                : 'Bạn có chắc chắn muốn chặn tài khoản này? Người dùng sẽ không thể đăng nhập hoặc sử dụng dịch vụ cho đến khi được kích hoạt lại.'
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsBlockDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button 
              variant={users.find((u) => u.id === userToBlock)?.status === 'blocked' ? 'default' : 'destructive'}
              onClick={confirmBlockUser}
            >
              {users.find((u) => u.id === userToBlock)?.status === 'blocked'
                ? 'Kích hoạt'
                : 'Chặn'
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}