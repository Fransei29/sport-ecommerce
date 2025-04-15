import { initMercadoPago } from "@mercadopago/sdk-react";

export function initializeMercadoPago() {
  const publicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY;
  if (!publicKey) {
    console.error("Error: NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY no está definido.");
    return;
  }

  initMercadoPago(publicKey, { locale: "es-AR" });
}
