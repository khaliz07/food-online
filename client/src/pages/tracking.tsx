import React from "react";
import { useParams } from "wouter";
import TrackingHeader from "@/components/tracking/TrackingHeader";
import OrderTracking from "@/components/tracking/OrderTracking";

const TrackingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const orderId = parseInt(id);
  
  return (
    <div className="flex-1 bg-neutral-100">
      <TrackingHeader />
      <OrderTracking orderId={orderId} />
    </div>
  );
};

export default TrackingPage;
