"use client";
import React, { useState } from "react";
import styles from "./ProductCard.module.scss";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  showAddToCartButton?: boolean; 
}

export default function ProductCard({ product, showAddToCartButton = true }: ProductCardProps) {
  const [loading, setLoading] = useState(false);

  async function handleAddToCart() {
    setLoading(true);
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "123", productId: product.id, quantity: 1 }),
    });
    setLoading(false);
  }

  return (
    <div className={styles.productCard}>
      <Image 
        src={product.image} 
        alt={product.name} 
        width={200} 
        height={200} 
        className={styles.productImage} 
      />
      <div className={styles.productInfo}>
        <div className={styles.productInfoA}>
          <h2 className={styles.productTitle}>{product.name}</h2>
          <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
        </div>

        {showAddToCartButton && ( // 👈 solo se muestra si es true
          <div className={styles.productInfoB}>
            <button className={styles.addToCartButton} onClick={handleAddToCart} disabled={loading}>
              {loading ? "Agregando..." : "Agregar al carrito"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
