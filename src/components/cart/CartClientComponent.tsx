'use client'

import React, { useState, useEffect } from "react";
import styles from "./CartClientComponent.module.scss";
import ProductCard from "../product/ProductCard";
import Link from "next/link";

interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}

async function getCart(userId: string) {
  const res = await fetch(`/api/cart`, { cache: "no-store" });
  if (!res.ok) return { items: [] };
  console.log(userId);
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
  const [total, setTotal] = useState(0);

  // Obtener el carrito al cargar el componente
  useEffect(() => {
    getCart(userId).then(setCart);
  }, [userId]);

  // Calcular el total dinámicamente
  useEffect(() => {
    const newTotal = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [cart]);

  async function handleQuantityChange(productId: string, quantity: number) {
    if (quantity < 1) return; // Evitar cantidades menores a 1
    await updateQuantity(userId, productId, quantity);
    const updatedCart = await getCart(userId);
    setCart(updatedCart);
  }

  async function handleClearCart() {
    await clearCart(userId);
    setCart({ items: [] });
    setTotal(0); // Reiniciar el total
  }

  return (
    <main className={styles.cartContainer}>
      {cart.items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          <h1>Tu Carrito</h1>
          <div className={styles.cartList}>
            {cart.items.map((item) => (
              <div key={item.product.id} className={styles.cartItem}>
                <ProductCard product={item.product} showAddToCartButton={false} />
                <div className={styles.quantityControls}>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mostrar el total */}
          <div className={styles.cartTotal}>
            <h2>Total: ${total.toFixed(2)}</h2>
          </div>

          {/* Sección de botones */}
          <section className={styles.cartButtons}>
            <button onClick={handleClearCart} className={styles.clearCartButton}>
              Vaciar Carrito
            </button>
            <Link href="/checkout">
              <button className={styles.checkoutButton}>Proceder al Pago</button>
            </Link>
          </section>
        </div>
      )}
    </main>
  );
}