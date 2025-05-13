// src/dao/userDAO.ts
import prisma from "@/lib/db";

export async function createUser(email: string, hashedPassword: string) {
  return prisma.user.create({ data: {
    email,
    password: hashedPassword,
    name: "Default Name", 
  }, });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}
