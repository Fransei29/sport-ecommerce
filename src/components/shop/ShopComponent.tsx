"use client";
import React, { useState, useEffect } from "react";
import styles from "./ShopComponent.module.scss";
import dynamic from "next/dynamic";

// Importación dinámica para ProductCard, si es un componente pesado
const ProductCard = dynamic(() => import("../../components/product/ProductCard"), {
  loading: () => <p>Cargando producto...</p>,
  ssr: false,
});

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

// Función para obtener los productos de la tienda
async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:3000/api/products");
  if (!res.ok) throw new Error("Error fetching products");
  return res.json();
}

// Función principal de la página de la tienda
export default function ShopComponent() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <main className={styles.shopContainer}>
      <h1>Tienda</h1>
      <div className={styles.productList}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
