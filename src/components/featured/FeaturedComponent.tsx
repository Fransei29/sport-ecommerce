'use client';

import React, { useEffect, useState, useRef } from "react";
import styles from "./FeaturedComponent.module.scss";
import ProductCard from "../../components/product/ProductCard";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";


interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

async function getFeaturedProducts(): Promise<Product[]> { 
  const res = await fetch("/api/products");
  if (!res.ok) return [];
  return res.json();
}

export default function Featured() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const productListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getFeaturedProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (productListRef.current) {
      const scrollAmount = 350;
      const currentScrollPosition = productListRef.current.scrollLeft;
      const newScrollPosition = direction === "right"
        ? currentScrollPosition + scrollAmount
        : currentScrollPosition - scrollAmount;
      productListRef.current.scrollTo({ left: newScrollPosition, behavior: "smooth" });
    }
  };

  return (
    <section className={styles.featuredSection}>
      <div className={styles.featured}>
        <h1>Productos Destacados</h1>
        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <div className={styles.productListWrapper}>
            <button
              className={styles.carouselButton}
              onClick={() => handleScroll("left")}
            >
             <AiOutlineLeft size={27} />
            </button>
            <div className={styles.productList} ref={productListRef}>
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p>No hay productos destacados disponibles.</p>
              )}
            </div>
            <button
              className={styles.carouselButton}
              onClick={() => handleScroll("right")}
            >
             <AiOutlineRight size={27} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
