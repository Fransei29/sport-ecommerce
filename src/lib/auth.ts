import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/db";

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
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email },
          });
  
          if (user && credentials?.password === user.password) {
            return user;
          }
          return null;
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async session({ session, token }) {
        if (session.user && token.sub) {  // Verificar si el token tiene id y agregarlo a session.user
          session.user.id = token.sub;
        }
        return session;
      },
      async jwt({ token, user }) {
        if (user) {
          token.sub = user.id;
        }
        return token;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  };
  