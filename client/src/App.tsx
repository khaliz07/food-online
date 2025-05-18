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

function Router() {
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
        <Route component={NotFound} />
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
          <Router />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
