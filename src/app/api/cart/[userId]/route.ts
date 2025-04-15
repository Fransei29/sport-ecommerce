import { NextResponse } from "next/server";
import { CartDAO } from "@/models/CartDAO";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    console.log("Obteniendo carrito del usuario:", params.userId);

    const cart = await CartDAO.getCart(params.userId);
    
    if (!cart) {
      return NextResponse.json({ items: [] });
    }

    console.log("Carrito obtenido:", cart);
    return NextResponse.json(cart);
  } catch (error) {
    console.error("Error obteniendo carrito:", error);
    return NextResponse.json({ error: "Error al obtener el carrito" }, { status: 500 });
  }
}
