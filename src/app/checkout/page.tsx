"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Wallet } from "@mercadopago/sdk-react";
import { initializeMercadoPago } from "@/lib/mercadopago-client"; 
import styles from './CheckoutPage.module.scss'

interface CartItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

interface CartData {
  items: CartItem[];
}

export default function CheckoutPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [cart, setCart] = useState<CartData>({ items: [] });
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [isMPInitialized, setIsMPInitialized] = useState(false);

  // Inicializamos Mercado Pago en el useEffect
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY;
    if (!publicKey) {
      console.error("Error: NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY no está definido.");
      return;
    }
    initializeMercadoPago();
    setIsMPInitialized(true);
  }, []);

  // Esperamos la inicialización antes de crear el pago
  useEffect(() => {
    if (userId && isMPInitialized) {
      createPayment();
    }
  }, [userId, isMPInitialized]);

  async function createPayment() {
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.preferenceId) {
        setPreferenceId(data.preferenceId);
      } else {
        console.error("Error: No se recibió preferenceId de Mercado Pago");
      }
    } catch (error) {
      console.error("Error al crear el pago:", error);
    }
  }

  useEffect(() => {
    if (!userId) return;
    fetchCart();
  }, [userId]);

  async function fetchCart() {
    const res = await fetch(`/api/cart`, { cache: "no-store" });
    const data = await res.json();
    setCart(data);
  }

  const total = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <main className={styles.checkoutContainer}>
    <h1 className={styles.checkoutTitle}>Checkout</h1>

    {cart.items.length === 0 ? (
      <p className={styles.cartEmpty}>
        Tu carrito está vacío. <Link href="/shop">Volver a la tienda</Link>
      </p>
    ) : (
      <>
        <div className={styles.cartList}>
          {cart.items.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <h2>{item.product.name}</h2>
              <p>
                Precio: ${item.product.price.toFixed(2)} x {item.quantity}
              </p>
            </div>
          ))}
        </div>
        <h2 className={styles.checkoutTotal}>Total: ${total.toFixed(2)}</h2>
        {preferenceId ? (
          <div className={styles.walletContainer}>
            <Wallet initialization={{ preferenceId }} />
          </div>
        ) : (
          <p className={styles.loadingText}>Cargando pago...</p>
        )}
      </>
    )}
  </main>
  );
}
