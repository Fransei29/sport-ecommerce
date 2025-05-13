import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  const { email, password, name } = await req.json(); // <-- Agregado name

  if (!email || !password || !name) {
    return NextResponse.json({ message: "Faltan datos" }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json({ message: "Ya existe un usuario con ese email" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name, 
    },
  });

  return NextResponse.json({ message: "Cuenta creada correctamente" }, { status: 201 });
}
