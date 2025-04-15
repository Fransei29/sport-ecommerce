import { NextResponse } from "next/server";
import { Payment } from "mercadopago";
import { getMercadoPagoClient } from "@/lib/mercadopago";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  console.log("🔍 Webhook recibido en Next.js");

  try {
    const body = await req.json();
    console.log("Datos recibidos en el webhook:", body);

    if (!body.data || !body.data.id) {
      console.error("Webhook sin ID de pago válido:", body);
      return NextResponse.json({ error: "ID de pago no válido" }, { status: 400 });
    }

    const paymentId = body.data.id;
    console.log(`🔍 Obteniendo información del pago con ID: ${paymentId}`);

    const mp = getMercadoPagoClient();
    const payment = await new Payment(mp).get({ id: paymentId });

    console.log("Pago recibido de Mercado Pago:", JSON.stringify(payment, null, 2));

    if (!payment.transaction_amount) {
      console.error("Error: Mercado Pago no envió el monto del pago.");
      return NextResponse.json({ error: "Falta el monto del pago" }, { status: 400 });
    }

    // ✅ Manejar el caso donde `payer` no exista
    const userEmail = payment.payer?.email || "email_por_defecto@example.com";
    console.log("Email del usuario:", userEmail);

    if (payment.status === "approved") {
      console.log("Pago aprobado, creando orden en la base de datos...");

      const user = await prisma.user.findFirst({
        where: { email: userEmail },
      });

      if (!user) {
        console.error(" Error: No se encontró el usuario para el pago.");
        return NextResponse.json({ error: "Usuario no encontrado" }, { status: 400 });
      }

      await prisma.order.create({
        data: {
          userId: user.id,
          totalPrice: Number(payment.transaction_amount),
        },
      });

      console.log("✅ Orden guardada en la base de datos.");

      await prisma.cartItem.deleteMany({
        where: { cart: { userId: user.id } },
      });

      console.log("✅ Carrito vaciado después del pago.");
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("❌ Error en Webhook:", error);
    return NextResponse.json({ error: "Error procesando el webhook" }, { status: 500 });
  }
}
