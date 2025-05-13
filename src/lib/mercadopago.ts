import { MercadoPagoConfig, Preference } from "mercadopago";

export function getMercadoPagoClient() {
  return new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
  });
}

export { Preference };
