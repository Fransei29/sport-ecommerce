import { NextResponse } from "next/server";
import { ProductDAO } from "@/models/ProductDAO";

// Funcion para obtener todos los productos
export async function GET() {
  try {
    const products = await ProductDAO.getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 });
  }
}
