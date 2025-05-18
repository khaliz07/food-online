import React, { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Smartphone, 
  ChefHat, 
  ShoppingBag, 
  BarChart2, 
  Store, 
  Bell, 
  UserCircle,
  Menu as MenuIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface OwnerLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/owner', label: 'Tổng quan', icon: <Smartphone className="w-5 h-5" /> },
  { path: '/owner/orders', label: 'Đơn hàng', icon: <ShoppingBag className="w-5 h-5" /> },
  { path: '/owner/menu', label: 'Quản lý món', icon: <ChefHat className="w-5 h-5" /> },
  { path: '/owner/restaurant', label: 'Cửa hàng', icon: <Store className="w-5 h-5" /> },
  { path: '/owner/stats', label: 'Thống kê', icon: <BarChart2 className="w-5 h-5" /> },
  { path: '/owner/notifications', label: 'Thông báo', icon: <Bell className="w-5 h-5" /> },
  { path: '/owner/profile', label: 'Tài khoản', icon: <UserCircle className="w-5 h-5" /> },
];

export default function OwnerLayout({ children }: OwnerLayoutProps) {
  const [location] = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Hiển thị menu dọc bên trái cho desktop, bottom navigation cho mobile
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar cho desktop */}
      {!isMobile && (
        <aside className="w-64 bg-white border-r border-gray-200 py-6 hidden md:block">
          <div className="px-6 mb-8">
            <h1 className="text-xl font-bold text-primary">Quản lý Cửa hàng</h1>
          </div>
          <nav className="space-y-1 px-3">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <a
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location === item.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </a>
              </Link>
            ))}
          </nav>
          <div className="px-6 mt-auto pt-6">
            <Link href="/">
              <Button variant="outline" className="w-full justify-start">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Chế độ khách hàng
              </Button>
            </Link>
          </div>
        </aside>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Responsive top header for mobile */}
        {isMobile && (
          <header className="bg-white border-b border-gray-200 py-4 px-4 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MenuIcon className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                  <div className="flex flex-col h-full">
                    <div className="py-6">
                      <h2 className="text-lg font-semibold mb-6 px-2">Quản lý cửa hàng</h2>
                      <nav className="space-y-1">
                        {navItems.map((item) => (
                          <Link key={item.path} href={item.path}>
                            <a
                              className={`flex items-center px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                                location === item.path
                                  ? 'bg-primary/10 text-primary'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {item.icon}
                              <span className="ml-3">{item.label}</span>
                            </a>
                          </Link>
                        ))}
                      </nav>
                    </div>
                    <div className="mt-auto px-2 pb-6">
                      <Link href="/">
                        <Button variant="outline" className="w-full justify-start">
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Chế độ khách hàng
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <h1 className="text-lg font-bold ml-3">
                {navItems.find(item => item.path === location)?.label || 'Quản lý cửa hàng'}
              </h1>
            </div>
            <div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  toast({
                    title: "Thông báo mới",
                    description: "Bạn có 3 đơn hàng đang chờ xử lý",
                  });
                }}
              >
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </header>
        )}
        
        <div className="p-6">
          {children}
        </div>

        {/* Bottom navigation for mobile */}
        {isMobile && (
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 flex justify-between items-center">
            <Link href="/owner">
              <a className={`flex flex-col items-center p-2 ${location === '/owner' ? 'text-primary' : 'text-gray-600'}`}>
                <Smartphone className="h-5 w-5" />
                <span className="text-xs mt-1">Tổng quan</span>
              </a>
            </Link>
            <Link href="/owner/orders">
              <a className={`flex flex-col items-center p-2 ${location === '/owner/orders' ? 'text-primary' : 'text-gray-600'}`}>
                <ShoppingBag className="h-5 w-5" />
                <span className="text-xs mt-1">Đơn hàng</span>
              </a>
            </Link>
            <Link href="/owner/menu">
              <a className={`flex flex-col items-center p-2 ${location === '/owner/menu' ? 'text-primary' : 'text-gray-600'}`}>
                <ChefHat className="h-5 w-5" />
                <span className="text-xs mt-1">Món ăn</span>
              </a>
            </Link>
            <Link href="/owner/stats">
              <a className={`flex flex-col items-center p-2 ${location === '/owner/stats' ? 'text-primary' : 'text-gray-600'}`}>
                <BarChart2 className="h-5 w-5" />
                <span className="text-xs mt-1">Thống kê</span>
              </a>
            </Link>
          </nav>
        )}
      </main>
    </div>
  );
}