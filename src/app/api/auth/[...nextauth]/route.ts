import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Manejamos la logica de autenticacion en /lib/auth

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
