import { NextResponse } from "next/server";
import { CartDAO } from "@/models/CartDAO";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Funcion para agregar un producto al carrito
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const userId = session.user.id;
  const { productId, quantity } = await req.json();

  console.log("Agregando producto al carrito:", { userId, productId, quantity });

  const cartItem = await CartDAO.addToCart(userId, productId, quantity);
  return NextResponse.json(cartItem);
}

// Funcion para obtener el carrito de un usuario
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const userId = session.user.id;
  console.log("Obteniendo carrito para usuario:", userId);

  const cart = await CartDAO.getCart(userId);
  return NextResponse.json(cart || { items: [] });
}

// Funcion para vaciar el carrito de un usuario
export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const userId = session.user.id;
  console.log("Vaciar carrito para usuario:", userId);

  const result = await CartDAO.clearCart(userId);
  console.log("Carrito vaciado:", result);

  return NextResponse.json({ success: true });
}

