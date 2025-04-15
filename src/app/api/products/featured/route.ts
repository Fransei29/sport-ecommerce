import { NextResponse } from "next/server";
import { ProductDAO } from "@/models/ProductDAO";

// Funcion para obtener los productos destacados
export async function GET() {
  try {
    const products = await ProductDAO.getFeaturedProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener productos destacados" }, { status: 500 });
  }
}
