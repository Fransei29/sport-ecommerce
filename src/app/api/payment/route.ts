import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getMercadoPagoClient } from "@/lib/mercadopago";
import { Preference } from "mercadopago";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const userId = session.user.id;

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { 
      items: { 
        include: { product: true }  // Asegurar que trae los productos
      } 
    },
  });

  if (!cart || !cart.items || cart.items.length === 0) {
    return NextResponse.json({ error: "Carrito vacío" }, { status: 400 });
  }

  const items = cart.items.map((item) => ({
    id: item.product.id,  // 🔥 Agregamos el ID del producto
    title: item.product.name,
    quantity: Number(item.quantity),
    unit_price: Number(item.product.price),
    currency_id: "ARS",
  }));

  try {
    const mp = getMercadoPagoClient();
    const preferenceInstance = new Preference(mp);

    const preference = await preferenceInstance.create({
      body: { 
        items: items,
        payer: {
          email: session.user.email ?? "comprador@example.com",
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/failure`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}/pending`,
        },
        auto_return: "approved",
      },
    });

    return NextResponse.json({ preferenceId: preference.id, sandboxUrl: preference.sandbox_init_point });
  } catch (error) {
    console.error("Error al crear la preferencia de pago:", error);
    return NextResponse.json({ error: "Error al procesar el pago" }, { status: 500 });
  }
}
