import { NextResponse } from "next/server";
import { CartDAO } from "@/models/CartDAO";

export async function DELETE(req: Request) {
  try {
    const { userId, productId } = await req.json();
    console.log("Eliminando producto:", { userId, productId });

    if (!userId || !productId) {
      return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
    }

    const result = await CartDAO.removeFromCart(userId, productId);
    console.log("✅ Producto eliminado:", result);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error);
    return NextResponse.json({ error: "Error al eliminar producto" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId, productId, quantity } = await req.json();
    console.log("Actualizando cantidad:", { userId, productId, quantity });

    if (!userId || !productId || quantity < 1) {
      return NextResponse.json({ error: "Parámetros inválidos" }, { status: 400 });
    }

    const updatedItem = await CartDAO.updateQuantity(userId, productId, quantity);
    console.log("✅ Cantidad actualizada:", updatedItem);

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Error al actualizar cantidad:", error);
    return NextResponse.json({ error: "Error al actualizar cantidad" }, { status: 500 });
  }
}


