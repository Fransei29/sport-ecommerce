import { NextAuthOptions } from "next-auth"; 
import type { NextRequest } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "tu@correo.com" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Buscar usuario y pedir password explícitamente
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
          },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
    callbacks: {
      async session({ session, token }: { session: Session; token: JWT }) {
    
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {

      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Helper que lee el JWT directamente de las cookies,para trabajar con la sesion en rutas route.ts
export async function getCurrentUser() {
  const fakeReq = {
    headers: cookies() as unknown as Headers,
  } as NextRequest;
  
  const token = await getToken({ req: fakeReq });
  

  if (!token?.sub) return null;

  return {
    id: token.sub,
    name: token.name,
    email: token.email,
  };
}
