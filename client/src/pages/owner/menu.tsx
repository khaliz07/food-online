import React, { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
} from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { FoodItem } from '@/lib/types';
import { 
  Plus, 
  PenSquare, 
  Trash2, 
  EyeOff,
  Eye, 
  Image as ImageIcon, 
  Filter
} from 'lucide-react';

// Mock data cho các món ăn
const mockFoodItems: FoodItem[] = [
  {
    id: 1,
    restaurantId: 1,
    name: 'Phở bò đặc biệt',
    description: 'Phở bò với thịt bò tươi ngon, giò heo và nhiều rau thơm',
    image: 'https://images.unsplash.com/photo-1583224964978-2ba74e88b5a9',
    price: 75000,
    category: 'Phở & Bún',
    isAvailable: true,
    isPopular: true
  },
  {
    id: 2,
    restaurantId: 1,
    name: 'Chả giò hải sản',
    description: 'Chả giò với nhân hải sản thơm ngon',
    image: 'https://images.unsplash.com/photo-1581184953963-d15972933db1',
    price: 35000,
    category: 'Khai vị',
    isAvailable: true,
    isPopular: false
  },
  {
    id: 3,
    restaurantId: 1,
    name: 'Bún bò Huế',
    description: 'Bún bò Huế cay nồng đặc trưng miền Trung',
    image: 'https://images.unsplash.com/photo-1576577445504-6af96477db52',
    price: 80000,
    category: 'Phở & Bún',
    isAvailable: true,
    isPopular: true
  },
  {
    id: 4,
    restaurantId: 1,
    name: 'Gỏi cuốn tôm thịt',
    description: 'Gỏi cuốn tươi mát với tôm, thịt và rau sống',
    image: 'https://images.unsplash.com/photo-1562059373-bc6efabcc4b9',
    price: 30000,
    category: 'Khai vị',
    isAvailable: true,
    isPopular: false
  },
  {
    id: 5,
    restaurantId: 1,
    name: 'Lẩu thái hải sản (nhỏ)',
    description: 'Lẩu Thái chua cay với các loại hải sản tươi ngon',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
    price: 250000,
    category: 'Lẩu & Nướng',
    isAvailable: true,
    isPopular: true
  },
  {
    id: 6,
    restaurantId: 1,
    name: 'Trà đào cam sả',
    description: 'Trà đào thơm mát với cam sả',
    image: 'https://images.unsplash.com/photo-1527761939622-bf599b87e2e3',
    price: 35000,
    category: 'Đồ uống',
    isAvailable: false,
    isPopular: false
  },
  {
    id: 7,
    restaurantId: 1,
    name: 'Cơm gà Hải Nam',
    description: 'Cơm gà Hải Nam với gà hấp mềm, thơm và nước chấm đặc biệt',
    image: 'https://images.unsplash.com/photo-1530469912745-a215c6b256ea',
    price: 120000,
    category: 'Cơm',
    isAvailable: true,
    isPopular: false
  },
  {
    id: 8,
    restaurantId: 1,
    name: 'Súp hoành thánh',
    description: 'Súp hoành thánh với nước dùng trong và ngọt',
    image: 'https://images.unsplash.com/photo-1469234496837-d0101f54be3e',
    price: 55000,
    category: 'Khai vị',
    isAvailable: true,
    isPopular: false
  },
];

// Danh sách danh mục món ăn
const categories = [
  'Tất cả',
  'Phở & Bún',
  'Cơm',
  'Khai vị',
  'Lẩu & Nướng',
  'Đồ uống',
  'Tráng miệng'
];

// Format tiền tệ
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
    .format(amount)
    .replace('₫', 'đ');
};

// Component cho form thêm/sửa món ăn
interface FoodFormProps {
  food?: FoodItem;
  onSubmit: (data: Partial<FoodItem>) => void;
  onCancel: () => void;
}

const FoodForm = ({ food, onSubmit, onCancel }: FoodFormProps) => {
  const [formData, setFormData] = useState<Partial<FoodItem>>(
    food 
      ? { ...food } 
      : { 
          name: '',
          description: '',
          price: 0,
          image: '',
          category: '',
          isAvailable: true,
          isPopular: false
        }
  );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };
  
  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (checked: boolean, name: string) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Tên món</Label>
        <Input 
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nhập tên món ăn"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Mô tả</Label>
        <Textarea 
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Mô tả ngắn về món ăn"
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Giá (VNĐ)</Label>
          <Input 
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleNumberChange}
            placeholder="Nhập giá"
            min={0}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Danh mục</Label>
          <Select 
            value={formData.category} 
            onValueChange={(value) => handleSelectChange(value, 'category')}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              {categories.filter(c => c !== 'Tất cả').map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Link ảnh món</Label>
        <Input 
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Nhập URL ảnh"
        />
        <div className="text-sm text-muted-foreground">
          Nhập đường dẫn URL ảnh từ Internet hoặc tải lên từ thiết bị của bạn
        </div>
      </div>
      
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="isAvailable" className="flex items-center space-x-2 cursor-pointer">
          <Switch 
            id="isAvailable" 
            checked={formData.isAvailable}
            onCheckedChange={(checked) => handleSwitchChange(checked, 'isAvailable')}
          />
          <span>Đang mở bán</span>
        </Label>
        
        <Label htmlFor="isPopular" className="flex items-center space-x-2 cursor-pointer">
          <Switch 
            id="isPopular" 
            checked={formData.isPopular}
            onCheckedChange={(checked) => handleSwitchChange(checked, 'isPopular')}
          />
          <span>Món phổ biến</span>
        </Label>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="submit">
          {food ? 'Cập nhật' : 'Thêm món'}
        </Button>
      </DialogFooter>
    </form>
  );
};

// Component cho một món ăn
interface FoodCardProps {
  food: FoodItem;
  onEdit: (food: FoodItem) => void;
  onDelete: (id: number) => void;
  onToggleAvailability: (id: number, available: boolean) => void;
}

const FoodCard = ({ food, onEdit, onDelete, onToggleAvailability }: FoodCardProps) => {
  return (
    <Card className={`overflow-hidden ${!food.isAvailable ? 'opacity-70' : ''}`}>
      <div className="relative h-40 overflow-hidden">
        {food.image ? (
          <img 
            src={food.image} 
            alt={food.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <ImageIcon className="h-10 w-10 text-gray-400" />
          </div>
        )}
        {food.isPopular && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            Phổ biến
          </span>
        )}
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base">{food.name}</CardTitle>
        <CardDescription className="line-clamp-2 h-10 text-xs">
          {food.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <span className="font-medium text-primary">{formatCurrency(food.price)}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500">{food.category}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-2 flex justify-between gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          className="flex-1 p-0"
          onClick={() => onEdit(food)}
        >
          <PenSquare className="h-4 w-4 mr-1" />
          Sửa
        </Button>
        {food.isAvailable ? (
          <Button 
            variant="ghost" 
            size="sm"
            className="flex-1 p-0"
            onClick={() => onToggleAvailability(food.id, false)}
          >
            <EyeOff className="h-4 w-4 mr-1" />
            Ẩn
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="sm"
            className="flex-1 p-0"
            onClick={() => onToggleAvailability(food.id, true)}
          >
            <Eye className="h-4 w-4 mr-1" />
            Hiện
          </Button>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="flex-1 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Xóa
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Bạn có chắc muốn xóa?</AlertDialogTitle>
              <AlertDialogDescription>
                Món ăn "{food.name}" sẽ bị xóa vĩnh viễn. Thao tác này không thể hoàn tác.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => onDelete(food.id)}
                className="bg-red-500 hover:bg-red-600"
              >
                Xóa món
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default function OwnerMenu() {
  const { toast } = useToast();
  const [foodItems, setFoodItems] = useState<FoodItem[]>(mockFoodItems);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Lọc món ăn theo danh mục và tìm kiếm
  const filteredFoodItems = foodItems.filter(food => {
    const matchesCategory = selectedCategory === 'Tất cả' || food.category === selectedCategory;
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (food.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    return matchesCategory && matchesSearch;
  });
  
  // Xử lý thêm món ăn
  const handleAddFood = (data: Partial<FoodItem>) => {
    const newFood: FoodItem = {
      id: Math.max(...foodItems.map(f => f.id)) + 1,
      restaurantId: 1,
      name: data.name || '',
      description: data.description || '',
      image: data.image || '',
      price: data.price || 0,
      category: data.category || '',
      isAvailable: data.isAvailable !== undefined ? data.isAvailable : true,
      isPopular: data.isPopular || false,
      createdAt: new Date()
    };
    
    setFoodItems(prev => [...prev, newFood]);
    setIsDialogOpen(false);
    
    toast({
      title: 'Thêm món thành công',
      description: `Món "${newFood.name}" đã được thêm vào thực đơn.`,
    });
  };
  
  // Xử lý cập nhật món ăn
  const handleUpdateFood = (data: Partial<FoodItem>) => {
    setFoodItems(prev => 
      prev.map(food => 
        food.id === data.id ? { ...food, ...data } : food
      )
    );
    setEditingFood(null);
    setIsDialogOpen(false);
    
    toast({
      title: 'Cập nhật thành công',
      description: `Món "${data.name}" đã được cập nhật.`,
    });
  };
  
  // Xử lý xóa món ăn
  const handleDeleteFood = (id: number) => {
    const foodToDelete = foodItems.find(food => food.id === id);
    setFoodItems(prev => prev.filter(food => food.id !== id));
    
    toast({
      title: 'Xóa món thành công',
      description: `Món "${foodToDelete?.name}" đã được xóa khỏi thực đơn.`,
    });
  };
  
  // Xử lý chuyển đổi trạng thái hiển thị món ăn
  const handleToggleAvailability = (id: number, available: boolean) => {
    setFoodItems(prev => 
      prev.map(food => 
        food.id === id ? { ...food, isAvailable: available } : food
      )
    );
    
    const foodItem = foodItems.find(food => food.id === id);
    toast({
      title: available ? 'Đã mở bán món' : 'Đã tạm ngưng món',
      description: `Món "${foodItem?.name}" đã được ${available ? 'mở bán trở lại' : 'tạm ngưng'}.`,
    });
  };
  
  // Xử lý khi nhấn nút sửa
  const handleEditFood = (food: FoodItem) => {
    setEditingFood(food);
    setIsDialogOpen(true);
  };
  
  // Xử lý đóng dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingFood(null);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight hidden md:block mb-6">Quản lý món ăn</h2>
      
      {/* Toolbar */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Input
            placeholder="Tìm kiếm món ăn..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none"
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
        
        <div className="flex gap-2 items-center">
          <Select 
            value={selectedCategory} 
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Danh mục" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Thêm món
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {editingFood ? 'Chỉnh sửa món ăn' : 'Thêm món ăn mới'}
                </DialogTitle>
                <DialogDescription>
                  {editingFood 
                    ? 'Chỉnh sửa thông tin món ăn bên dưới.' 
                    : 'Điền đầy đủ thông tin để thêm món ăn mới.'}
                </DialogDescription>
              </DialogHeader>
              
              <ScrollArea className="max-h-[70vh]">
                <div className="px-1 py-2">
                  <FoodForm 
                    food={editingFood || undefined}
                    onSubmit={editingFood ? handleUpdateFood : handleAddFood}
                    onCancel={handleCloseDialog}
                  />
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Hiển thị số lượng món ăn tìm thấy */}
      <div className="mb-4 text-sm text-gray-500">
        Hiển thị {filteredFoodItems.length} món {selectedCategory !== 'Tất cả' ? `trong danh mục "${selectedCategory}"` : ''}
        {searchQuery && ` với từ khóa "${searchQuery}"`}
      </div>
      
      {/* Grid của các món ăn */}
      {filteredFoodItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredFoodItems.map(food => (
            <FoodCard 
              key={food.id} 
              food={food} 
              onEdit={handleEditFood}
              onDelete={handleDeleteFood}
              onToggleAvailability={handleToggleAvailability}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">Không tìm thấy món ăn</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery 
              ? `Không tìm thấy món ăn nào với từ khóa "${searchQuery}"`
              : 'Không có món ăn nào trong danh mục này'}
          </p>
          <div className="mt-6">
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Tất cả');
              }}
            >
              Xóa bộ lọc
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}