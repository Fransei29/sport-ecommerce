import React from "react";

import styles from "./home.module.scss";
import Banner from "@/components/banner/BannerComponent";
import Category from "@/components/category/CategoryComponent";
import Featured from "@/components/featured/FeaturedComponent";

export default async function HomePage() {
  
  
  return (
    <main className={styles.homeContainer}>

      {/* Banner Principal */}
      <Banner />

      {/* Productos Destacados */}
      <Featured />
      
      {/* Sección de Categorías */}
      <Category />
      
      
  
    </main>
  );
}
