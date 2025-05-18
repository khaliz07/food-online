import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { useToast } from '@/hooks/use-toast';
import { User } from '@/lib/types';
import { 
  UserCircle, 
  Mail, 
  Phone, 
  Save, 
  LogOut, 
  Lock,
  Loader2
} from 'lucide-react';
import { Link } from 'wouter';

// Mock data cho user
const mockUser: User = {
  id: 1,
  username: 'nguyenvana',
  email: 'nguyenvana@example.com',
  fullName: 'Nguyễn Văn A',
  phone: '0901234567',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  role: 'owner',
  createdAt: new Date('2022-05-15')
};

export default function OwnerProfile() {
  const { toast } = useToast();
  const [user, setUser] = useState<User>(mockUser);
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  
  // Xử lý thay đổi thông tin cơ bản
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };
  
  // Xử lý lưu thông tin
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Giả lập delay khi lưu
    setTimeout(() => {
      setLoading(false);
      toast({
        title: 'Lưu thành công',
        description: 'Thông tin tài khoản đã được cập nhật.',
      });
    }, 1500);
  };
  
  // Xử lý đổi mật khẩu
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Kiểm tra mật khẩu mới
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Lỗi',
        description: 'Mật khẩu mới không khớp. Vui lòng kiểm tra lại.',
        variant: 'destructive'
      });
      return;
    }
    
    setLoading(true);
    
    // Giả lập delay khi lưu
    setTimeout(() => {
      setLoading(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordForm(false);
      
      toast({
        title: 'Đổi mật khẩu thành công',
        description: 'Mật khẩu của bạn đã được cập nhật.',
      });
    }, 1500);
  };
  
  // Format ngày tạo tài khoản
  const formatDate = (date?: Date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight hidden md:block mb-6">Tài khoản của tôi</h2>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Profile Card */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle>Thông tin cá nhân</CardTitle>
              <CardDescription>
                Cập nhật thông tin tài khoản của bạn
              </CardDescription>
            </div>
            {user.avatar && (
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                <img 
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và tên</Label>
                  <div className="flex">
                    <UserCircle className="h-5 w-5 mr-2 text-gray-400 mt-3" />
                    <Input
                      id="fullName"
                      name="fullName"
                      value={user.fullName || ''}
                      onChange={handleChange}
                      placeholder="Họ và tên"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username">Tên đăng nhập</Label>
                  <Input
                    id="username"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    placeholder="Tên đăng nhập"
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-gray-500">Tên đăng nhập không thể thay đổi</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex">
                    <Mail className="h-5 w-5 mr-2 text-gray-400 mt-3" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={user.email || ''}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <div className="flex">
                    <Phone className="h-5 w-5 mr-2 text-gray-400 mt-3" />
                    <Input
                      id="phone"
                      name="phone"
                      value={user.phone || ''}
                      onChange={handleChange}
                      placeholder="Số điện thoại"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="avatar">URL ảnh đại diện</Label>
                <Input
                  id="avatar"
                  name="avatar"
                  value={user.avatar || ''}
                  onChange={handleChange}
                  placeholder="Nhập URL ảnh đại diện"
                />
              </div>
              
              <div className="pt-2 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Tài khoản được tạo từ: {formatDate(user.createdAt)}
                </div>
                <Button type="submit" disabled={loading}>
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
          </CardContent>
        </Card>
        
        {/* Password Card */}
        <Card>
          <CardHeader>
            <CardTitle>Bảo mật</CardTitle>
            <CardDescription>
              Thay đổi mật khẩu và cài đặt bảo mật khác
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showPasswordForm ? (
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Nhập mật khẩu hiện tại"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Mật khẩu mới</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới"
                    required
                  />
                </div>
                
                <div className="flex justify-between pt-2">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setShowPasswordForm(false)}
                  >
                    Hủy
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang xử lý...
                      </>
                    ) : (
                      'Đổi mật khẩu'
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-sm">Mật khẩu</h3>
                  <p className="text-sm text-gray-500">Thay đổi mật khẩu đăng nhập của bạn</p>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => setShowPasswordForm(true)}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Đổi mật khẩu
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Logout Card */}
        <Card className="bg-red-50 border-red-100">
          <CardHeader>
            <CardTitle className="text-red-600">Đăng xuất</CardTitle>
            <CardDescription className="text-red-700">
              Đăng xuất khỏi tài khoản của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Đăng xuất
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Xác nhận đăng xuất</AlertDialogTitle>
                  <AlertDialogDescription>
                    Bạn có chắc chắn muốn đăng xuất khỏi tài khoản quản lý?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <Link href="/">
                    <AlertDialogAction>Đăng xuất</AlertDialogAction>
                  </Link>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}