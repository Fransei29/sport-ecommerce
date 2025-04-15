"use client";

import React, { useEffect, useState } from "react";
import styles from "./FeaturedComponent.module.scss";
import ProductCard from "../../components/product/ProductCard"; 
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

async function getFeaturedProducts(): Promise<Product[]> { 
  const res = await fetch("http://localhost:3000/api/products/featured");
  if (!res.ok) return [];
  return res.json();
}

export default function Featured() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section className={styles.featured}>
      <h1>Productos Destacados</h1>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className={styles.productList}>
          {products.length > 0 ? (
            products.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className={styles.productLink}>
                <ProductCard product={product} />
              </Link>
            ))
          ) : (
            <p>No hay productos destacados disponibles.</p>
          )}
        </div>
      )}
    </section>
  );
}
