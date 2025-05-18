import React, { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Camera, 
  Calendar, 
  Clock, 
  Bike,
  LogOut,
  Shield,
  Upload,
  Save
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DeliveryStats } from '@/lib/shipper-types';

// Mock data cho hồ sơ shipper
const mockProfile = {
  id: 123,
  name: 'Nguyễn Văn Shipper',
  phone: '0901234567',
  email: 'shipper@email.com',
  avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
  address: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM',
  birthDate: '1995-06-15',
  joinDate: '2023-02-10',
  vehicleType: 'motorcycle',
  vehiclePlate: '59P1-12345',
  idCard: '123456789012',
  bankAccount: '9876543210',
  bankName: 'VietcomBank',
  deliveryZone: 'Quận 1, Quận 3, Quận 4',
  activeStatus: 'online',
  bio: 'Shipper chuyên nghiệp với 2 năm kinh nghiệm. Giao hàng nhanh chóng, đúng hẹn và an toàn.',
  workingHours: [
    { day: 'Thứ 2', from: '08:00', to: '17:00', isWorking: true },
    { day: 'Thứ 3', from: '08:00', to: '17:00', isWorking: true },
    { day: 'Thứ 4', from: '08:00', to: '17:00', isWorking: true },
    { day: 'Thứ 5', from: '08:00', to: '17:00', isWorking: true },
    { day: 'Thứ 6', from: '08:00', to: '17:00', isWorking: true },
    { day: 'Thứ 7', from: '09:00', to: '15:00', isWorking: true },
    { day: 'Chủ nhật', from: '00:00', to: '00:00', isWorking: false },
  ]
};

// Mock data cho thống kê shipper
const mockStats: DeliveryStats = {
  totalDeliveries: 520,
  deliveredCount: 505,
  failedCount: 15,
  averageDeliveryTime: 28, // in minutes
  dailyStats: [
    { date: 'T2', deliveries: 15, successRate: 100 },
    { date: 'T3', deliveries: 18, successRate: 94.4 },
    { date: 'T4', deliveries: 12, successRate: 100 },
    { date: 'T5', deliveries: 20, successRate: 95 },
    { date: 'T6', deliveries: 22, successRate: 95.5 },
    { date: 'T7', deliveries: 16, successRate: 93.8 },
    { date: 'CN', deliveries: 8, successRate: 100 },
  ]
};

export default function ShipperProfile() {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState(mockProfile);
  
  // Form state
  const [formData, setFormData] = useState({
    name: profile.name,
    phone: profile.phone,
    email: profile.email,
    address: profile.address,
    vehicleType: profile.vehicleType,
    vehiclePlate: profile.vehiclePlate,
    bankAccount: profile.bankAccount,
    bankName: profile.bankName,
    bio: profile.bio,
  });
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Cập nhật profile với data từ form
    setProfile(prev => ({
      ...prev,
      ...formData
    }));
    
    // Tắt chế độ chỉnh sửa
    setEditMode(false);
    
    // Hiển thị thông báo thành công
    toast({
      title: 'Đã cập nhật hồ sơ',
      description: 'Thông tin hồ sơ của bạn đã được cập nhật thành công.',
    });
  };
  
  // Hủy chỉnh sửa
  const handleCancel = () => {
    // Reset form data về giá trị hiện tại của profile
    setFormData({
      name: profile.name,
      phone: profile.phone,
      email: profile.email,
      address: profile.address,
      vehicleType: profile.vehicleType,
      vehiclePlate: profile.vehiclePlate,
      bankAccount: profile.bankAccount,
      bankName: profile.bankName,
      bio: profile.bio,
    });
    
    // Tắt chế độ chỉnh sửa
    setEditMode(false);
  };
  
  // Handle avatar upload
  const handleAvatarUpload = () => {
    // Trong ứng dụng thực tế, đây sẽ mở dialog chọn file
    toast({
      title: 'Tính năng đang phát triển',
      description: 'Chức năng tải lên ảnh đại diện đang được phát triển.',
    });
  };
  
  // Handle logout
  const handleLogout = () => {
    toast({
      title: 'Đã đăng xuất',
      description: 'Bạn đã đăng xuất khỏi hệ thống.',
    });
    
    // Chuyển về trang đăng nhập
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold hidden md:block">Hồ sơ cá nhân</h1>
      
      <Tabs defaultValue="profile">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
          <TabsTrigger value="stats">Thống kê</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                      <img 
                        src={profile.avatar} 
                        alt={profile.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {editMode && (
                      <Button 
                        variant="default" 
                        size="icon" 
                        className="absolute bottom-0 right-0 h-6 w-6 rounded-full"
                        onClick={handleAvatarUpload}
                      >
                        <Camera className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{profile.name}</CardTitle>
                    <CardDescription>Shipper ID: #{profile.id}</CardDescription>
                    <div className="flex items-center mt-1">
                      <div className={`w-2 h-2 rounded-full mr-1.5 ${profile.activeStatus === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span className="text-sm text-gray-500 capitalize">{profile.activeStatus === 'online' ? 'Đang hoạt động' : 'Không hoạt động'}</span>
                    </div>
                  </div>
                </div>
                <div>
                  {!editMode ? (
                    <Button 
                      variant="default" 
                      onClick={() => setEditMode(true)}
                    >
                      Chỉnh sửa hồ sơ
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={handleCancel}
                      >
                        Hủy
                      </Button>
                      <Button 
                        variant="default" 
                        onClick={handleSubmit}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Lưu thay đổi
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-6">
              {editMode ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Họ và tên</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Họ và tên"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Số điện thoại"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Địa chỉ</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Địa chỉ"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicleType">Loại phương tiện</Label>
                      <Select 
                        value={formData.vehicleType} 
                        onValueChange={(value) => handleSelectChange('vehicleType', value)}
                      >
                        <SelectTrigger id="vehicleType">
                          <SelectValue placeholder="Chọn loại phương tiện" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="motorcycle">Xe máy</SelectItem>
                          <SelectItem value="bicycle">Xe đạp</SelectItem>
                          <SelectItem value="car">Ô tô</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehiclePlate">Biển số xe</Label>
                      <Input
                        id="vehiclePlate"
                        name="vehiclePlate"
                        value={formData.vehiclePlate}
                        onChange={handleChange}
                        placeholder="Biển số xe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Ngân hàng</Label>
                      <Select 
                        value={formData.bankName} 
                        onValueChange={(value) => handleSelectChange('bankName', value)}
                      >
                        <SelectTrigger id="bankName">
                          <SelectValue placeholder="Chọn ngân hàng" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="VietcomBank">VietcomBank</SelectItem>
                          <SelectItem value="BIDV">BIDV</SelectItem>
                          <SelectItem value="Agribank">Agribank</SelectItem>
                          <SelectItem value="TPBank">TPBank</SelectItem>
                          <SelectItem value="Techcombank">Techcombank</SelectItem>
                          <SelectItem value="VPBank">VPBank</SelectItem>
                          <SelectItem value="MBBank">MBBank</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankAccount">Số tài khoản</Label>
                      <Input
                        id="bankAccount"
                        name="bankAccount"
                        value={formData.bankAccount}
                        onChange={handleChange}
                        placeholder="Số tài khoản"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Giới thiệu bản thân</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Giới thiệu bản thân"
                      rows={4}
                    />
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">Thông tin cá nhân</h3>
                        <Separator className="my-2" />
                        
                        <div className="space-y-3 mt-4">
                          <div className="flex items-start">
                            <User className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Họ và tên</p>
                              <p>{profile.name}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Số điện thoại</p>
                              <p>{profile.phone}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Email</p>
                              <p>{profile.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Địa chỉ</p>
                              <p>{profile.address}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Calendar className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Ngày sinh</p>
                              <p>{new Date(profile.birthDate).toLocaleDateString('vi-VN')}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Clock className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Ngày tham gia</p>
                              <p>{new Date(profile.joinDate).toLocaleDateString('vi-VN')}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">Thông tin công việc</h3>
                        <Separator className="my-2" />
                        
                        <div className="space-y-3 mt-4">
                          <div className="flex items-start">
                            <Bike className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Phương tiện</p>
                              <p>
                                {profile.vehicleType === 'motorcycle' ? 'Xe máy' : 
                                 profile.vehicleType === 'bicycle' ? 'Xe đạp' : 'Ô tô'} - {profile.vehiclePlate}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Shield className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Số CMND/CCCD</p>
                              <p>{profile.idCard}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Khu vực giao hàng</p>
                              <p>{profile.deliveryZone}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Thông tin ngân hàng</p>
                              <p>{profile.bankName} - {profile.bankAccount}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">Giới thiệu</h3>
                        <Separator className="my-2" />
                        <p className="text-gray-700 mt-3">{profile.bio}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Lịch làm việc</h3>
                    <Separator className="my-2" />
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2 mt-3">
                      {profile.workingHours.map((day) => (
                        <div 
                          key={day.day} 
                          className={`p-2 rounded-md border text-center ${
                            day.isWorking ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <p className="font-medium text-sm mb-1">{day.day}</p>
                          {day.isWorking ? (
                            <p className="text-xs">{day.from} - {day.to}</p>
                          ) : (
                            <p className="text-xs text-gray-500">Không làm việc</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6">
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Đăng xuất
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông số shipper</CardTitle>
              <CardDescription>Thống kê chi tiết hoạt động của bạn từ khi tham gia nền tảng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Tổng số đơn đã giao</p>
                  <h2 className="text-3xl font-bold">{mockStats.totalDeliveries}</h2>
                  <p className="text-sm text-green-600 mt-2">Thành công: {mockStats.deliveredCount} ({(mockStats.deliveredCount / mockStats.totalDeliveries * 100).toFixed(1)}%)</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Thời gian giao trung bình</p>
                  <h2 className="text-3xl font-bold">{mockStats.averageDeliveryTime} phút</h2>
                  <p className="text-sm text-blue-600 mt-2">Thời gian từ lúc nhận đến lúc giao hàng</p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Xếp hạng shipper</p>
                  <h2 className="text-3xl font-bold">★ 4.9/5</h2>
                  <p className="text-sm text-yellow-600 mt-2">Đánh giá từ 178 khách hàng</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Lịch sử giao hàng theo tháng</h3>
                  <div className="h-9 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center pl-3"
                      style={{ width: `${(mockStats.deliveredCount / mockStats.totalDeliveries) * 100}%` }}
                    >
                      <span className="text-xs font-medium text-white">
                        {(mockStats.deliveredCount / mockStats.totalDeliveries * 100).toFixed(1)}% thành công
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0 đơn</span>
                    <span>{mockStats.totalDeliveries} đơn</span>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-4">Chi tiết theo ngày trong tuần</h3>
                  <div className="grid grid-cols-7 gap-2">
                    {mockStats.dailyStats.map((day) => (
                      <div key={day.date} className="flex flex-col items-center">
                        <div className="text-sm font-medium mb-1">{day.date}</div>
                        <div className="relative w-full h-24 bg-gray-100 rounded flex flex-col-reverse">
                          <div 
                            className="bg-blue-500 rounded-b"
                            style={{ height: `${(day.deliveries / Math.max(...mockStats.dailyStats.map(d => d.deliveries))) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs mt-1">{day.deliveries} đơn</div>
                        <div className="text-xs text-green-600">{day.successRate}%</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Thành tích</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 flex items-center">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <Bike className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Shipper chăm chỉ</p>
                        <p className="text-sm text-gray-500">Hoàn thành hơn 500 đơn hàng</p>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 flex items-center">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Giao hàng nhanh</p>
                        <p className="text-sm text-gray-500">Thời gian giao dưới 30 phút</p>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 flex items-center">
                      <div className="bg-purple-100 p-3 rounded-full mr-4">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-purple-600"
                        >
                          <path d="M20 6 9 17l-5-5"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Shipper đáng tin cậy</p>
                        <p className="text-sm text-gray-500">Tỷ lệ giao thành công 97%</p>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 flex items-center">
                      <div className="bg-yellow-100 p-3 rounded-full mr-4">
                        <Star className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium">Đánh giá xuất sắc</p>
                        <p className="text-sm text-gray-500">Đạt 4.9/5 sao từ khách hàng</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const Star = ({ className }: { className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path 
        fillRule="evenodd" 
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
        clipRule="evenodd" 
      />
    </svg>
  );
};