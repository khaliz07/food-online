import React, { useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  MapPin, 
  Clock, 
  Package, 
  Box, 
  Check, 
  X,
  ArrowLeft,
  Phone,
  MapIcon,
  MessageSquare,
  CircleCheck,
  CircleAlert,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ShipperOrder, DeliveryStatus } from '@/lib/shipper-types';

// Mock data cho đơn hàng
const mockOrders: ShipperOrder[] = [
  {
    id: 1001,
    userId: 101,
    restaurantId: 1,
    total: 185000,
    status: 'processing',
    deliveryStatus: 'new',
    paymentMethod: 'COD',
    address: '123 Đường Nguyễn Văn Linh, Quận 7, TP.HCM',
    createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 phút trước
    assignedShipperId: 1,
    customer: {
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      address: '123 Đường Nguyễn Văn Linh, Quận 7, TP.HCM'
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
        id: 1,
        orderId: 1001,
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
      },
      {
        id: 2,
        orderId: 1001,
        foodItemId: 2,
        quantity: 1,
        price: 35000,
        subtotal: 35000,
        foodItem: {
          id: 2,
          restaurantId: 1,
          name: 'Chả giò hải sản',
          image: 'https://images.unsplash.com/photo-1581184953963-d15972933db1',
          price: 35000
        }
      }
    ]
  },
  {
    id: 1002,
    userId: 102,
    restaurantId: 2,
    total: 250000,
    status: 'processing',
    deliveryStatus: 'picking_up',
    pickupTime: new Date(Date.now() - 10 * 60 * 1000), // 10 phút trước
    paymentMethod: 'Banking',
    address: '456 Đường Lê Văn Lương, Quận 7, TP.HCM',
    createdAt: new Date(Date.now() - 45 * 60 * 1000), // 45 phút trước
    assignedShipperId: 1,
    customer: {
      name: 'Trần Thị B',
      phone: '0909876543',
      address: '456 Đường Lê Văn Lương, Quận 7, TP.HCM'
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
        id: 3,
        orderId: 1002,
        foodItemId: 10,
        quantity: 2,
        price: 80000,
        subtotal: 160000,
        foodItem: {
          id: 10,
          restaurantId: 2,
          name: 'Sushi combo đặc biệt',
          image: 'https://images.unsplash.com/photo-1558985250-27a406d64cb3',
          price: 80000
        }
      },
      {
        id: 4,
        orderId: 1002,
        foodItemId: 11,
        quantity: 3,
        price: 30000,
        subtotal: 90000,
        foodItem: {
          id: 11,
          restaurantId: 2,
          name: 'Miso soup',
          image: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305',
          price: 30000
        }
      }
    ]
  },
  {
    id: 1003,
    userId: 103,
    restaurantId: 3,
    total: 320000,
    status: 'processing',
    deliveryStatus: 'delivering',
    pickupTime: new Date(Date.now() - 20 * 60 * 1000), // 20 phút trước
    startDeliveryTime: new Date(Date.now() - 15 * 60 * 1000), // 15 phút trước
    paymentMethod: 'COD',
    address: '789 Đường Nguyễn Hữu Thọ, Quận 7, TP.HCM',
    createdAt: new Date(Date.now() - 90 * 60 * 1000), // 1.5 giờ trước
    assignedShipperId: 1,
    customer: {
      name: 'Lê Văn C',
      phone: '0912345678',
      address: '789 Đường Nguyễn Hữu Thọ, Quận 7, TP.HCM'
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
        id: 5,
        orderId: 1003,
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
        id: 6,
        orderId: 1003,
        foodItemId: 21,
        quantity: 2,
        price: 40000,
        subtotal: 80000,
        foodItem: {
          id: 21,
          restaurantId: 3,
          name: 'Chè thái',
          image: 'https://images.unsplash.com/photo-1642411867063-6469ecc6020e',
          price: 40000
        }
      }
    ]
  }
];

// Format tiền tệ
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
    .format(amount)
    .replace('₫', 'đ');
};

// Format thời gian
const formatTime = (date?: Date) => {
  if (!date) return 'N/A';
  return new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

// Component hiển thị badge trạng thái
const DeliveryStatusBadge = ({ status }: { status: DeliveryStatus }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'new':
        return { 
          text: 'Đơn mới', 
          icon: <Package className="h-3 w-3 mr-1" />,
          variant: 'secondary'
        };
      case 'picking_up':
        return { 
          text: 'Đang lấy món', 
          icon: <Box className="h-3 w-3 mr-1" />,
          variant: 'outline'
        };
      case 'delivering':
        return { 
          text: 'Đang giao', 
          icon: <MapPin className="h-3 w-3 mr-1" />,
          variant: 'default'
        };
      case 'delivered':
        return { 
          text: 'Đã giao', 
          icon: <Check className="h-3 w-3 mr-1" />,
          variant: 'success'
        };
      case 'failed':
        return { 
          text: 'Không giao được', 
          icon: <X className="h-3 w-3 mr-1" />,
          variant: 'destructive'
        };
      default:
        return { 
          text: 'Không xác định', 
          icon: null,
          variant: 'secondary'
        };
    }
  };

  const config = getStatusConfig();
  let badgeClass = '';
  
  switch (config.variant) {
    case 'success':
      badgeClass = 'bg-green-100 text-green-800 hover:bg-green-200';
      break;
    case 'destructive':
      badgeClass = 'bg-red-100 text-red-800 hover:bg-red-200';
      break;
    case 'outline':
      badgeClass = 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      break;
    case 'default':
      badgeClass = 'bg-primary/20 text-primary hover:bg-primary/30';
      break;
    default:
      badgeClass = 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
  
  return (
    <Badge className={`flex items-center ${badgeClass}`} variant="outline">
      {config.icon}
      {config.text}
    </Badge>
  );
};

// Component hiển thị các bước trạng thái
const DeliveryStatusTimeline = ({ order }: { order: ShipperOrder }) => {
  const getStatusSteps = () => {
    const steps = [
      {
        status: 'new',
        title: 'Đơn mới',
        description: 'Đơn hàng được gán cho bạn',
        time: order.createdAt,
        completed: ['new', 'picking_up', 'delivering', 'delivered'].includes(order.deliveryStatus),
        current: order.deliveryStatus === 'new'
      },
      {
        status: 'picking_up',
        title: 'Lấy món',
        description: 'Đã lấy món từ nhà hàng',
        time: order.pickupTime,
        completed: ['picking_up', 'delivering', 'delivered'].includes(order.deliveryStatus),
        current: order.deliveryStatus === 'picking_up'
      },
      {
        status: 'delivering',
        title: 'Đang giao',
        description: 'Đang trên đường giao hàng',
        time: order.startDeliveryTime,
        completed: ['delivering', 'delivered'].includes(order.deliveryStatus),
        current: order.deliveryStatus === 'delivering'
      },
      {
        status: 'delivered',
        title: 'Đã giao',
        description: 'Giao hàng thành công',
        time: order.completedTime,
        completed: order.deliveryStatus === 'delivered',
        current: order.deliveryStatus === 'delivered'
      }
    ];
    
    // Nếu đơn thất bại, thêm trạng thái này vào
    if (order.deliveryStatus === 'failed') {
      steps.pop(); // Xóa bước hoàn thành
      steps.push({
        status: 'failed',
        title: 'Không giao được',
        description: order.failureReason || 'Không thể giao hàng',
        time: order.completedTime,
        completed: true,
        current: true
      });
    }
    
    return steps;
  };
  
  const steps = getStatusSteps();
  
  return (
    <div className="py-2">
      {steps.map((step, index) => (
        <div key={step.status} className="flex group relative">
          <div className="flex flex-col items-center mr-4">
            <div className={`rounded-full h-8 w-8 flex items-center justify-center z-10
              ${step.current ? 'bg-primary text-white' : 
                step.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'}`}
            >
              {step.current && <CircleCheck className="h-5 w-5" />}
              {!step.current && step.completed && <Check className="h-5 w-5" />}
              {!step.current && !step.completed && <div className="h-3 w-3 rounded-full bg-gray-400"></div>}
            </div>
            {index < steps.length - 1 && (
              <div className={`h-full w-0.5 ${step.completed ? 'bg-green-500' : 'bg-gray-200'}`}></div>
            )}
          </div>
          <div className={`pt-1 pb-6 ${index === steps.length - 1 ? 'pb-0' : ''}`}>
            <h4 className={`font-medium ${step.current ? 'text-primary' : 'text-gray-900'}`}>{step.title}</h4>
            <p className="text-sm text-gray-500">{step.description}</p>
            {step.time && (
              <span className="text-xs text-gray-400 mt-1 block">{formatTime(step.time)}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function OrderDetailPage() {
  const [match, params] = useRoute('/shipper/order/:id');
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isFailureDialogOpen, setIsFailureDialogOpen] = useState(false);
  const [failureReason, setFailureReason] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  
  // Nếu không có khớp route, chuyển về trang danh sách đơn
  if (!match) {
    navigate('/shipper');
    return null;
  }
  
  // Tìm đơn hàng theo ID
  const orderId = parseInt(params?.id || '0');
  const order = mockOrders.find(order => order.id === orderId);
  
  // Nếu không tìm thấy đơn hàng, chuyển về trang danh sách
  if (!order) {
    navigate('/shipper');
    return null;
  }
  
  // Xử lý cập nhật trạng thái đơn hàng
  const handleUpdateStatus = (newStatus: DeliveryStatus) => {
    // Trong môi trường thực tế, đây sẽ là API call
    // Mô phỏng cập nhật thành công
    toast({
      title: 'Đã cập nhật trạng thái',
      description: 'Trạng thái đơn hàng đã được cập nhật.',
    });
    
    // Sau khi cập nhật thành công, chuyển về trang danh sách đơn
    setTimeout(() => {
      navigate('/shipper');
    }, 1500);
  };
  
  // Xử lý báo cáo không giao được
  const handleReportFailure = () => {
    // Kiểm tra có lý do không
    if (!selectedReason && !failureReason) {
      toast({
        title: 'Thiếu thông tin',
        description: 'Vui lòng chọn hoặc nhập lý do không giao được.',
        variant: 'destructive'
      });
      return;
    }
    
    const reason = selectedReason === 'other' ? failureReason : selectedReason;
    
    // Trong môi trường thực tế, đây sẽ là API call
    // Mô phỏng cập nhật thành công
    toast({
      title: 'Đã báo cáo',
      description: 'Đơn hàng đã được đánh dấu là không giao được.',
    });
    
    setIsFailureDialogOpen(false);
    
    // Sau khi cập nhật thành công, chuyển về trang danh sách đơn
    setTimeout(() => {
      navigate('/shipper');
    }, 1500);
  };
  
  // Các action button dựa trên trạng thái hiện tại
  const renderActionButtons = () => {
    switch (order.deliveryStatus) {
      case 'new':
        return (
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={() => handleUpdateStatus('picking_up')}
              className="flex-1"
            >
              <Box className="h-4 w-4 mr-2" />
              Đã đến lấy món
            </Button>
            <Dialog 
              open={isFailureDialogOpen} 
              onOpenChange={setIsFailureDialogOpen}
            >
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Báo không lấy được
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Báo cáo không giao được</DialogTitle>
                  <DialogDescription>
                    Vui lòng chọn lý do không giao được đơn hàng này.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <Select value={selectedReason} onValueChange={setSelectedReason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn lý do" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="restaurant_closed">Nhà hàng đóng cửa</SelectItem>
                      <SelectItem value="restaurant_busy">Nhà hàng quá tải, từ chối đơn</SelectItem>
                      <SelectItem value="out_of_stock">Món ăn đã hết</SelectItem>
                      <SelectItem value="wrong_address">Địa chỉ không chính xác</SelectItem>
                      <SelectItem value="other">Lý do khác</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {selectedReason === 'other' && (
                    <Textarea 
                      placeholder="Nhập lý do cụ thể tại đây"
                      value={failureReason}
                      onChange={(e) => setFailureReason(e.target.value)}
                    />
                  )}
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsFailureDialogOpen(false)}
                  >
                    Hủy
                  </Button>
                  <Button 
                    onClick={handleReportFailure}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Xác nhận báo cáo
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        );
      case 'picking_up':
        return (
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={() => handleUpdateStatus('delivering')}
              className="flex-1"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Bắt đầu giao hàng
            </Button>
            <Dialog 
              open={isFailureDialogOpen} 
              onOpenChange={setIsFailureDialogOpen}
            >
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Báo gặp vấn đề
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Báo cáo không giao được</DialogTitle>
                  <DialogDescription>
                    Vui lòng chọn lý do không giao được đơn hàng này.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <Select value={selectedReason} onValueChange={setSelectedReason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn lý do" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="items_damaged">Món ăn bị hư hỏng</SelectItem>
                      <SelectItem value="incorrect_items">Món ăn không đúng</SelectItem>
                      <SelectItem value="out_of_stock">Món ăn đã hết</SelectItem>
                      <SelectItem value="restaurant_delay">Nhà hàng chuẩn bị quá lâu</SelectItem>
                      <SelectItem value="other">Lý do khác</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {selectedReason === 'other' && (
                    <Textarea 
                      placeholder="Nhập lý do cụ thể tại đây"
                      value={failureReason}
                      onChange={(e) => setFailureReason(e.target.value)}
                    />
                  )}
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsFailureDialogOpen(false)}
                  >
                    Hủy
                  </Button>
                  <Button 
                    onClick={handleReportFailure}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Xác nhận báo cáo
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        );
      case 'delivering':
        return (
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={() => handleUpdateStatus('delivered')}
              className="flex-1"
            >
              <Check className="h-4 w-4 mr-2" />
              Đã giao hàng
            </Button>
            <Dialog 
              open={isFailureDialogOpen} 
              onOpenChange={setIsFailureDialogOpen}
            >
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Không giao được
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Báo cáo không giao được</DialogTitle>
                  <DialogDescription>
                    Vui lòng chọn lý do không giao được đơn hàng này.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <Select value={selectedReason} onValueChange={setSelectedReason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn lý do" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer_unavailable">Khách hàng không có mặt</SelectItem>
                      <SelectItem value="customer_unreachable">Không liên lạc được với khách</SelectItem>
                      <SelectItem value="wrong_address">Địa chỉ không chính xác</SelectItem>
                      <SelectItem value="customer_rejected">Khách từ chối nhận hàng</SelectItem>
                      <SelectItem value="inaccessible_location">Không thể tiếp cận địa điểm</SelectItem>
                      <SelectItem value="other">Lý do khác</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {selectedReason === 'other' && (
                    <Textarea 
                      placeholder="Nhập lý do cụ thể tại đây"
                      value={failureReason}
                      onChange={(e) => setFailureReason(e.target.value)}
                    />
                  )}
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsFailureDialogOpen(false)}
                  >
                    Hủy
                  </Button>
                  <Button 
                    onClick={handleReportFailure}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Xác nhận báo cáo
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        );
      default:
        return (
          <Button 
            variant="outline" 
            onClick={() => navigate('/shipper')}
            className="w-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại danh sách
          </Button>
        );
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/shipper')}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-bold">Chi tiết đơn hàng #{order.id}</h1>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Trạng thái giao hàng</CardTitle>
              <CardDescription>Cập nhật theo từng bước giao hàng</CardDescription>
            </div>
            <DeliveryStatusBadge status={order.deliveryStatus} />
          </div>
        </CardHeader>
        <CardContent>
          <DeliveryStatusTimeline order={order} />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Thông tin nhà hàng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                <img 
                  src={order.restaurant.image} 
                  alt={order.restaurant.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{order.restaurant.name}</h3>
                <p className="text-sm text-gray-500">{order.restaurant.category}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm">{order.restaurant.address}</p>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(order.restaurant.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline mt-1 inline-block"
                >
                  <MapIcon className="h-3 w-3 inline mr-1" />
                  Mở Google Maps
                </a>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" size="sm" className="mr-2">
                <Phone className="h-4 w-4 mr-2" />
                Gọi nhà hàng
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Nhắn tin
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Thông tin khách hàng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h3 className="font-medium">{order.customer.name}</h3>
              <p className="text-sm text-gray-500">{order.customer.phone}</p>
            </div>
            
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm">{order.customer.address}</p>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(order.customer.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline mt-1 inline-block"
                >
                  <MapIcon className="h-3 w-3 inline mr-1" />
                  Mở Google Maps
                </a>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" size="sm" className="mr-2">
                <Phone className="h-4 w-4 mr-2" />
                Gọi khách hàng
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Nhắn tin
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Chi tiết món ăn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center">
                <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                  <img 
                    src={item.foodItem?.image} 
                    alt={item.foodItem?.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.foodItem?.name}</h4>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-gray-500">SL: {item.quantity}</span>
                    <span className="text-sm font-medium">{formatCurrency(item.subtotal)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Tổng tiền hàng:</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
            
            {order.deliveryFee && (
              <div className="flex justify-between text-sm">
                <span>Phí giao hàng:</span>
                <span>{formatCurrency(order.deliveryFee)}</span>
              </div>
            )}
            
            {order.discount && (
              <div className="flex justify-between text-sm">
                <span>Giảm giá:</span>
                <span>-{formatCurrency(order.discount)}</span>
              </div>
            )}
            
            <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-100">
              <span>Tổng thanh toán:</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
            
            <div className="bg-gray-50 p-2 rounded-md text-sm mt-2">
              <span className="font-medium mr-1">Phương thức thanh toán:</span>
              <span>{order.paymentMethod === 'COD' ? 'Tiền mặt khi nhận hàng' : 'Đã thanh toán online'}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          {renderActionButtons()}
        </CardFooter>
      </Card>
    </div>
  );
}