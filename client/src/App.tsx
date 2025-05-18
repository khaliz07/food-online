import { Switch, Route } from "wouter";
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

function Router() {
  return (
    <Switch>
      {/* Customer routes */}
      <Route path="/">
        {() => (
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
            </Switch>
          </AppLayout>
        )}
      </Route>
      
      {/* Owner/Saler routes */}
      <Route path="/owner">
        {() => (
          <OwnerLayout>
            <Switch>
              <Route path="/owner" component={OwnerDashboard} />
              <Route path="/owner/orders" component={OwnerOrders} />
              <Route path="/owner/menu" component={OwnerMenu} />
              <Route path="/owner/restaurant" component={OwnerRestaurant} />
              <Route path="/owner/stats" component={OwnerStats} />
              <Route path="/owner/profile" component={OwnerProfile} />
              <Route path="/owner/notifications" component={OwnerNotifications} />
            </Switch>
          </OwnerLayout>
        )}
      </Route>
      
      {/* 404 route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Router />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
