import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import NotFound from "@/pages/not-found";
import AppLayout from "@/components/layout/AppLayout";
import HomePage from "@/pages/home";
import RestaurantPage from "@/pages/restaurant";
import CartPage from "@/pages/cart";
import CheckoutPage from "@/pages/checkout";
import TrackingPage from "@/pages/tracking";
import SearchPage from "@/pages/search";
import OrdersPage from "@/pages/orders";
import ProfilePage from "@/pages/profile";

// Owner/Saler pages
import OwnerDashboard from "@/pages/owner/dashboard";
import OwnerOrders from "@/pages/owner/orders";
import OwnerMenu from "@/pages/owner/menu";
import OwnerRestaurant from "@/pages/owner/restaurant";
import OwnerStats from "@/pages/owner/stats";
import OwnerProfile from "@/pages/owner/profile";
import OwnerNotifications from "@/pages/owner/notifications";
import OwnerLayout from "@/components/owner/OwnerLayout";

// Shipper pages
import ShipperLayout from "@/components/shipper/ShipperLayout";
import ShipperOrderList from "@/pages/shipper/index";
import ShipperOrderDetail from "@/pages/shipper/order/[id]";
import ShipperHistory from "@/pages/shipper/history";
import ShipperNotifications from "@/pages/shipper/notifications";
import ShipperProfile from "@/pages/shipper/profile";

// Route helper component to differentiate between different user roles routes
function RouteManager() {
  const [location] = useLocation();
  
  // Check if current path is an owner path
  const isOwnerPath = location.startsWith('/owner');
  
  // Check if current path is a shipper path
  const isShipperPath = location.startsWith('/shipper');
  
  if (isOwnerPath) {
    return (
      <OwnerLayout>
        <Switch>
          <Route path="/owner" component={OwnerDashboard} />
          <Route path="/owner/orders" component={OwnerOrders} />
          <Route path="/owner/menu" component={OwnerMenu} />
          <Route path="/owner/restaurant" component={OwnerRestaurant} />
          <Route path="/owner/stats" component={OwnerStats} />
          <Route path="/owner/profile" component={OwnerProfile} />
          <Route path="/owner/notifications" component={OwnerNotifications} />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </OwnerLayout>
    );
  }
  
  if (isShipperPath) {
    return (
      <ShipperLayout>
        <Switch>
          <Route path="/shipper" component={ShipperOrderList} />
          <Route path="/shipper/order/:id" component={ShipperOrderDetail} />
          <Route path="/shipper/history" component={ShipperHistory} />
          <Route path="/shipper/notifications" component={ShipperNotifications} />
          <Route path="/shipper/profile" component={ShipperProfile} />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </ShipperLayout>
    );
  }
  
  // Default to customer layout
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/restaurant/:id" component={RestaurantPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/tracking/:id" component={TrackingPage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/orders" component={OrdersPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <RouteManager />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
