import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Restaurant } from '@/lib/types';
import { 
  Store, 
  Clock, 
  MapPin, 
  Globe, 
  Phone, 
  Image as ImageIcon,
  Save,
  Loader2
} from 'lucide-react';

// Mock data cho nhà hàng
const mockRestaurant: Restaurant = {
  id: 1,
  name: 'Nhà hàng Phở Việt',
  description: 'Nhà hàng chuyên phục vụ các món ăn truyền thống Việt Nam với hương vị đậm đà, nguyên liệu tươi ngon và giá cả phải chăng.',
  image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
  address: '123 Đường Nguyễn Văn Linh, Quận 7, TP.HCM',
  category: 'Việt Nam',
  rating: 4.8,
  deliveryTime: '15-25 phút',
  deliveryFee: 15000,
  openingHours: '07:00',
  closingHours: '22:00',
  isOpen: true,
  serviceAreas: ['Quận 7', 'Quận 4', 'Quận 8'],
  ownerId: 1
};

// Danh sách khu vực phục vụ mẫu
const serviceAreaOptions = [
  'Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 
  'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9', 'Quận 10',
  'Quận 11', 'Quận 12', 'Quận Bình Thạnh', 'Quận Tân Bình', 'Quận Phú Nhuận',
  'Quận Gò Vấp', 'Quận Tân Phú', 'Quận Bình Tân', 'Thủ Đức'
];

// Danh sách danh mục nhà hàng
const categoryOptions = [
  'Việt Nam', 'Nhật Bản', 'Hàn Quốc', 'Trung Hoa', 'Thái Lan',
  'Ý', 'Âu - Mỹ', 'Ấn Độ', 'Đồ chay', 'Đồ ăn nhanh',
  'Bánh ngọt', 'Kem & Trà sữa', 'Cà phê'
];

export default function OwnerRestaurant() {
  const { toast } = useToast();
  const [restaurant, setRestaurant] = useState<Restaurant>(mockRestaurant);
  const [loading, setLoading] = useState(false);
  
  // Xử lý thay đổi thông tin cơ bản
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRestaurant(prev => ({ ...prev, [name]: value }));
  };
  
  // Xử lý thay đổi số
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRestaurant(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };
  
  // Xử lý thay đổi switch
  const handleSwitchChange = (checked: boolean) => {
    setRestaurant(prev => ({ ...prev, isOpen: checked }));
  };
  
  // Xử lý thay đổi danh mục
  const handleCategoryChange = (value: string) => {
    setRestaurant(prev => ({ ...prev, category: value }));
  };
  
  // Xử lý thay đổi khu vực phục vụ
  const handleServiceAreasChange = (value: string) => {
    const areas = value.split(',');
    setRestaurant(prev => ({ ...prev, serviceAreas: areas }));
  };
  
  // Xử lý lưu thông tin
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Giả lập delay khi lưu
    setTimeout(() => {
      setLoading(false);
      toast({
        title: 'Lưu thành công',
        description: 'Thông tin cửa hàng đã được cập nhật thành công.',
      });
    }, 1500);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight hidden md:block mb-6">Quản lý cửa hàng</h2>
      
      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Thông tin cơ bản */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center">
                <Store className="h-5 w-5 mr-2" />
                Thông tin cơ bản
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên cửa hàng</Label>
                <Input
                  id="name"
                  name="name"
                  value={restaurant.name}
                  onChange={handleChange}
                  placeholder="Nhập tên cửa hàng"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={restaurant.description}
                  onChange={handleChange}
                  placeholder="Mô tả ngắn về cửa hàng"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <div className="flex">
                  <MapPin className="h-5 w-5 mr-2 text-gray-400 mt-3" />
                  <Input
                    id="address"
                    name="address"
                    value={restaurant.address}
                    onChange={handleChange}
                    placeholder="Địa chỉ cửa hàng"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="openingHours">Giờ mở cửa</Label>
                  <div className="flex">
                    <Clock className="h-5 w-5 mr-2 text-gray-400 mt-3" />
                    <Input
                      id="openingHours"
                      name="openingHours"
                      type="time"
                      value={restaurant.openingHours}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="closingHours">Giờ đóng cửa</Label>
                  <div className="flex">
                    <Clock className="h-5 w-5 mr-2 text-gray-400 mt-3" />
                    <Input
                      id="closingHours"
                      name="closingHours"
                      type="time"
                      value={restaurant.closingHours}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deliveryTime">Thời gian giao hàng</Label>
                  <Input
                    id="deliveryTime"
                    name="deliveryTime"
                    value={restaurant.deliveryTime}
                    onChange={handleChange}
                    placeholder="VD: 15-30 phút"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deliveryFee">Phí giao hàng (VNĐ)</Label>
                  <Input
                    id="deliveryFee"
                    name="deliveryFee"
                    type="number"
                    value={restaurant.deliveryFee}
                    onChange={handleNumberChange}
                    placeholder="Nhập phí giao hàng"
                    min={0}
                    step={1000}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Danh mục</Label>
                <Select 
                  value={restaurant.category} 
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="serviceAreas">Khu vực phục vụ</Label>
                <Select 
                  value={restaurant.serviceAreas?.join(',')}
                  onValueChange={handleServiceAreasChange}
                >
                  <SelectTrigger id="serviceAreas">
                    <SelectValue placeholder="Chọn khu vực phục vụ" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceAreaOptions.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-2">
                  {restaurant.serviceAreas && restaurant.serviceAreas.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {restaurant.serviceAreas.map((area, index) => (
                        <div key={index} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {area}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">Chưa chọn khu vực phục vụ</div>
                  )}
                </div>
              </div>
              
              <div className="pt-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="isOpen" 
                    checked={restaurant.isOpen}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label htmlFor="isOpen">
                    {restaurant.isOpen ? 'Cửa hàng đang mở' : 'Cửa hàng đang đóng'}
                  </Label>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {restaurant.isOpen 
                    ? 'Khách hàng có thể đặt món từ cửa hàng của bạn' 
                    : 'Tạm ngưng nhận đơn đặt hàng từ khách hàng'}
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Ảnh và thông tin liên hệ */}
          <Card className="md:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center">
                <ImageIcon className="h-5 w-5 mr-2" />
                Ảnh & Liên hệ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Ảnh đại diện cửa hàng</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  {restaurant.image ? (
                    <div className="relative">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="mx-auto rounded-lg max-h-40 object-cover"
                      />
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="absolute top-2 right-2"
                        onClick={() => setRestaurant(prev => ({ ...prev, image: '' }))}
                      >
                        Xóa
                      </Button>
                    </div>
                  ) : (
                    <div className="py-4">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2 text-sm text-gray-500">
                        Tải lên ảnh đại diện cho cửa hàng
                      </div>
                    </div>
                  )}
                  <div className="mt-2">
                    <Input
                      id="image"
                      name="image"
                      type="text"
                      value={restaurant.image}
                      onChange={handleChange}
                      placeholder="Nhập URL ảnh"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <div className="flex">
                    <Phone className="h-5 w-5 mr-2 text-gray-400 mt-3" />
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Số điện thoại liên hệ"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website (nếu có)</Label>
                  <div className="flex">
                    <Globe className="h-5 w-5 mr-2 text-gray-400 mt-3" />
                    <Input
                      id="website"
                      name="website"
                      placeholder="Website cửa hàng"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={loading} className="px-6">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang lưu...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Lưu thay đổi
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}