"use client";

import React, { useEffect, useState } from "react";

interface Order {
  id: string;
  totalPrice: number;
  createdAt: string;
  items: { product: { name: string }; quantity: number; price: number }[];
}

async function getOrders(): Promise<Order[]> {
  const res = await fetch("/api/orders");
  if (!res.ok) return [];
  return res.json();
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  return (
    <main>
      <h1>Mis Compras</h1>
      {orders.length === 0 ? <p>No tienes compras aún.</p> : 
        orders.map((order) => (
          <div key={order.id}>
            <h2>Orden #{order.id}</h2>
            <p>Total: ${order.totalPrice.toFixed(2)}</p>
            <ul>
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.product.name} - {item.quantity} x ${item.price}
                </li>
              ))}
            </ul>
          </div>
        ))
      }
    </main>
  );
}
