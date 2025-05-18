import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  Truck, 
  Package, 
  AlertCircle, 
  Settings, 
  ChevronDown, 
  ChevronRight, 
  Bell, 
  LogOut,
  Menu as MenuIcon,
  X,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

interface AdminLayoutProps {
  children: ReactNode;
}

const mainMenuItems = [
  { 
    path: '/admin', 
    label: 'Tổng quan', 
    icon: <LayoutDashboard className="w-5 h-5" />,
    badge: null
  },
  { 
    path: '/admin/users', 
    label: 'Quản lý người dùng', 
    icon: <Users className="w-5 h-5" />,
    badge: null
  },
  { 
    path: '/admin/sales', 
    label: 'Quản lý chủ quán', 
    icon: <Store className="w-5 h-5" />,
    badge: { text: '3', variant: 'default' }
  },
  { 
    path: '/admin/shippers', 
    label: 'Quản lý shipper', 
    icon: <Truck className="w-5 h-5" />,
    badge: null
  },
  { 
    path: '/admin/orders', 
    label: 'Quản lý đơn hàng', 
    icon: <Package className="w-5 h-5" />,
    badge: null
  },
  { 
    path: '/admin/complaints', 
    label: 'Khiếu nại', 
    icon: <AlertCircle className="w-5 h-5" />,
    badge: { text: '5', variant: 'destructive' }
  },
  { 
    path: '/admin/settings', 
    label: 'Cài đặt hệ thống', 
    icon: <Settings className="w-5 h-5" />,
    badge: null
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleLogout = () => {
    toast({
      title: "Đăng xuất thành công",
      description: "Bạn đã đăng xuất khỏi hệ thống quản trị",
    });
    
    // In real application, perform actual logout and redirect
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  // Filter menu items based on search query
  const filteredMenuItems = mainMenuItems.filter(
    item => item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const renderMenuItems = (items: typeof mainMenuItems) => {
    return items.map((item) => (
      <div key={item.path}>
        <Link href={item.path}>
          <div
            className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              location === item.path
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <div className="flex items-center">
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </div>
            {item.badge && (
              <Badge 
                variant={item.badge.variant as any} 
                className="ml-auto"
              >
                {item.badge.text}
              </Badge>
            )}
          </div>
        </Link>
      </div>
    ));
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-64 flex-col border-r bg-card">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl">FoodDelivery</span>
          </div>
          <Badge variant="outline" className="text-xs">
            Admin
          </Badge>
        </div>
        
        <div className="p-4">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Tìm kiếm" 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1 px-4 py-2">
          <nav className="space-y-1">
            {renderMenuItems(filteredMenuItems)}
          </nav>
        </ScrollArea>
        
        <div className="p-4 border-t mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-muted-foreground">admin@foodapp.com</p>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Tài khoản</DropdownMenuItem>
                <DropdownMenuItem>Thông báo</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>
      
      {/* Mobile header and menu */}
      <div className="flex flex-col flex-1">
        <header className="lg:hidden sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px] pr-0">
              <div className="flex flex-col h-full">
                <div className="px-4 pb-2 pt-4 flex items-center justify-between border-b">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg">FoodDelivery</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Admin
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="absolute right-2 top-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="p-4">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                    <Input 
                      type="search" 
                      placeholder="Tìm kiếm" 
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <ScrollArea className="flex-1 px-2">
                  <nav className="flex flex-col space-y-1 p-2">
                    {renderMenuItems(filteredMenuItems)}
                  </nav>
                </ScrollArea>
                
                <div className="p-4 border-t mt-auto">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <p className="text-sm font-medium">Admin</p>
                      <p className="text-xs text-muted-foreground">admin@foodapp.com</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="ml-auto" 
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <div className="flex-1 flex items-center justify-between">
            <span className="font-semibold">Admin Dashboard</span>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                  3
                </span>
              </Button>
              
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}