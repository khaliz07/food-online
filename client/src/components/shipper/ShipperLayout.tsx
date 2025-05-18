import React, { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Home,
  Package,
  History,
  Bell,
  User,
  Menu as MenuIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface ShipperLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/shipper', label: 'Đơn hàng', icon: <Package className="w-5 h-5" /> },
  { path: '/shipper/history', label: 'Lịch sử', icon: <History className="w-5 h-5" /> },
  { path: '/shipper/notifications', label: 'Thông báo', icon: <Bell className="w-5 h-5" /> },
  { path: '/shipper/profile', label: 'Tài khoản', icon: <User className="w-5 h-5" /> },
];

export default function ShipperLayout({ children }: ShipperLayoutProps) {
  const [location] = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar cho desktop */}
      {!isMobile && (
        <aside className="w-64 bg-white border-r border-gray-200 py-6 hidden md:block">
          <div className="px-6 mb-8">
            <h1 className="text-xl font-bold text-primary">Shipper Dashboard</h1>
          </div>
          <nav className="space-y-1 px-3">
            {navItems.map((item) => (
              <div key={item.path}>
                <Link href={item.path}>
                  <div
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                      location === item.path
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </div>
                </Link>
              </div>
            ))}
          </nav>
          <div className="px-6 mt-auto pt-6">
            <Link href="/">
              <Button variant="outline" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Trang chủ
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
                      <h2 className="text-lg font-semibold mb-6 px-2">Shipper Dashboard</h2>
                      <nav className="space-y-1">
                        {navItems.map((item) => (
                          <div key={item.path}>
                            <Link href={item.path}>
                              <div
                                className={`flex items-center px-2 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                                  location === item.path
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                {item.icon}
                                <span className="ml-3">{item.label}</span>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </nav>
                    </div>
                    <div className="mt-auto px-2 pb-6">
                      <Link href="/">
                        <Button variant="outline" className="w-full justify-start">
                          <Home className="mr-2 h-4 w-4" />
                          Trang chủ
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <h1 className="text-lg font-bold ml-3">
                {navItems.find(item => item.path === location)?.label || 'Shipper Dashboard'}
              </h1>
            </div>
            <div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  toast({
                    title: "Đơn hàng mới",
                    description: "Bạn có 1 đơn hàng mới cần giao",
                  });
                }}
              >
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </header>
        )}
        
        <div className="p-6 pb-24">
          {children}
        </div>

        {/* Bottom navigation for mobile */}
        {isMobile && (
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 flex justify-between items-center">
            <Link href="/shipper">
              <div className={`flex flex-col items-center p-2 cursor-pointer ${location === '/shipper' ? 'text-primary' : 'text-gray-600'}`}>
                <Package className="h-5 w-5" />
                <span className="text-xs mt-1">Đơn hàng</span>
              </div>
            </Link>
            <Link href="/shipper/history">
              <div className={`flex flex-col items-center p-2 cursor-pointer ${location === '/shipper/history' ? 'text-primary' : 'text-gray-600'}`}>
                <History className="h-5 w-5" />
                <span className="text-xs mt-1">Lịch sử</span>
              </div>
            </Link>
            <Link href="/shipper/notifications">
              <div className={`flex flex-col items-center p-2 cursor-pointer ${location === '/shipper/notifications' ? 'text-primary' : 'text-gray-600'}`}>
                <Bell className="h-5 w-5" />
                <span className="text-xs mt-1">Thông báo</span>
              </div>
            </Link>
            <Link href="/shipper/profile">
              <div className={`flex flex-col items-center p-2 cursor-pointer ${location === '/shipper/profile' ? 'text-primary' : 'text-gray-600'}`}>
                <User className="h-5 w-5" />
                <span className="text-xs mt-1">Tài khoản</span>
              </div>
            </Link>
          </nav>
        )}
      </main>
    </div>
  );
}