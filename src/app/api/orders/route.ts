import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth"; 

export async function POST() {
  try {
    // 1. Obtener el usuario actual
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Obtener los items del carrito
    const cartItems = await prisma.cartItem.findMany({
      where: { cart: { userId: user.id } },
      include: { product: true }
    });

    if (cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // 3. Verificar stock
    for (const item of cartItems) {
      if (item.quantity > item.product.stock) {
        return NextResponse.json({
          error: `Not enough stock for ${item.product.name}`
        }, { status: 400 });
      }
    }

    // 4. Calcular el total
    const total = cartItems.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    // 5. Crear la orden y los items
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalPrice: total,
        items: {
          create: cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price
          }))
        }
      },
      include: { items: true }
    });

    // 6. Actualizar stock
    for (const item of cartItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });
    }

    // 7. Limpiar carrito
    await prisma.cartItem.deleteMany({
      where: { cart: { userId: user.id } }
    });

    return NextResponse.json({ order }, { status: 201 });

  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
