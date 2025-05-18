import React from "react";
import HomeHeader from "@/components/home/HomeHeader";
import FoodCategories from "@/components/home/FoodCategories";
import PromoSlider from "@/components/home/PromoSlider";
import NearbyRestaurants from "@/components/home/NearbyRestaurants";
import PopularFoods from "@/components/home/PopularFoods";

const HomePage: React.FC = () => {
  return (
    <div className="flex-1">
      <HomeHeader />
      <FoodCategories />
      <PromoSlider />
      <NearbyRestaurants />
      <PopularFoods />
    </div>
  );
};

export default HomePage;
