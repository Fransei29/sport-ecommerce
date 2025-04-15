import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import CartClient from "../../components/cart/CartClientComponent"; 

export default async function CartPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/cart");
  }

  const userId = session.user?.id as string;

  return <CartClient userId={userId} />;
}
