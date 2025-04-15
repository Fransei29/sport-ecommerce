"use client";

import React, { useEffect, useState } from "react";
import styles from "./CartClientComponent.module.scss";
import ProductCard from "../product/ProductCard"; 
import Link from "next/link";

interface CartItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;  
  };
  quantity: number;
}

async function getCart(userId: string): Promise<{ items: CartItem[] }> {
  const res = await fetch(`/api/cart`, { cache: "no-store" });
  if (!res.ok) return { items: [] };
  return res.json();
}

async function updateQuantity(userId: string, productId: string, quantity: number) {
  await fetch("/api/cart/item", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, productId, quantity }),
  });
}

async function clearCart(userId: string) {
  await fetch("/api/cart", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
}

export default function CartClient({ userId }: { userId: string }) {
  const [cart, setCart] = useState<{ items: CartItem[] }>({ items: [] });

  useEffect(() => {
    getCart(userId).then(setCart);
  }, [userId]);

  async function handleQuantityChange(productId: string, quantity: number) {
    await updateQuantity(userId, productId, quantity);
    setCart((prevCart) => ({
      items: prevCart.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    }));
  }

  async function handleClearCart() {
    const confirmClear = confirm("¿Estás seguro de que deseas vaciar el carrito?");
    if (confirmClear) {
      await clearCart(userId);
      setCart({ items: [] });
    }
  }

  return (
    <main className={styles.cartContainer}>
    <h1 className={styles.cartTitle}>Carrito</h1>
    {cart.items.length === 0 ? (
      <p>Tu carrito está vacío.</p>
    ) : (
      <div>
        {/* Lista de productos */}
        <div className={styles.cartList}>
          {cart.items.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <ProductCard product={item.product} />
              <p>Cantidad: {item.quantity}</p>
              <button onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}>-</button>
              <button onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}>+</button>
            </div>
          ))}
        </div>

        {/* Sección de botones */}
        <section className={styles.cartButtons}>
          <button onClick={handleClearCart} className={styles.clearCartButton}>
            Vaciar Carrito
          </button>
          <Link href="/checkout">
            <button className={styles.checkoutButton}>
              Proceder al Pago
            </button>
          </Link>
        </section>
      </div>
    )}
  </main>
  );
}
