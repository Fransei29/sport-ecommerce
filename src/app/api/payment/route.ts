import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getMercadoPagoClient } from "@/lib/mercadopago";
import { Preference } from "mercadopago";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("No autenticado");
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const userId = session.user.id;
  console.log("Usuario autenticado:", userId);

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true }
      }
    }
  });

  if (!cart || cart.items.length === 0) {
    console.log("Carrito vacío para el usuario:", userId);
    return NextResponse.json({ error: "Carrito vacío" }, { status: 400 });
  }

  const items = cart.items.map((item) => ({
    id: item.product.id,
    title: item.product.name,
    quantity: item.quantity,
    unit_price: item.product.price,
    currency_id: "ARS",
  }));

  // ✅ Usamos URLs explícitas para evitar errores con variables mal definidas
  const backUrls = {
    success: "https://45ff-190-120-124-251.ngrok-free.app/success",
    failure: "https://45ff-190-120-124-251.ngrok-free.app/failure",
    pending: "https://45ff-190-120-124-251.ngrok-free.app/pending",
  };

  const preferenceBody = {
    items,
    payer: {
      email: session.user.email ?? "comprador@example.com",
    },
    back_urls: backUrls,
    auto_return: "approved", // ⚠️ 'all' puede dar error si success no está bien
  };

  console.log("Preferencia a enviar:", JSON.stringify(preferenceBody, null, 2));

  try {
    const mp = getMercadoPagoClient();
    const preferenceInstance = new Preference(mp);

    const preference = await preferenceInstance.create({ body: preferenceBody });

    console.log("Preferencia creada con éxito:", preference.id);

    return NextResponse.json({
      preferenceId: preference.id,
      sandboxUrl: preference.sandbox_init_point,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al crear preferencia de pago:", error.message);
    } else {
      console.error("Error al crear preferencia de pago:", error);
    }
    return NextResponse.json({ error: "Error al procesar el pago" }, { status: 500 });
  }
}
