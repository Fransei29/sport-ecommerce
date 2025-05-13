import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Seeding database...");

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash("123456", 10); // 10 es el número de salt rounds

  // Crear un usuario de prueba
  const user = await prisma.user.upsert({
    where: { email: "franco@gmail.com" },
    update: {},
    create: {
      email: "franco@gmail.com",
      password: hashedPassword, // Contraseña encriptada
      name: "Franco Seiler",
    },
  });

  console.log("✅ Usuario creado:", user);

  console.log("Seeding database...");

  // Crear productos
  await prisma.product.createMany({
    data: [
      {
        name: "Zapatilla Marron",
        price: 120.00,
        stock: 50,
        createdAt: new Date(),
        image: "/assets/A.avif",
      },
      {
        name: "Zapatillas Beige",
        price: 120.00,
        stock: 30,
        createdAt: new Date(),
        image: "/assets/A1.avif",
      },
      {
        name: "Zapatilla Negra",
        price: 120.00,
        stock: 20,
        createdAt: new Date(),
        image: "/assets/A2.avif",
      },
      {
        name: "Campera Blanca",
        price: 70.00,
        stock: 25,
        createdAt: new Date(),
        image: "/assets/B.avif",
      },
      {
        name: "Campera Naranja",
        price: 70.00,
        stock: 40,
        createdAt: new Date(),
        image: "/assets/B1.avif",
      },
      {
        name: "Buzo Gris Oscuro",
        price: 65.99,
        stock: 35,
        createdAt: new Date(),
        image: "/assets/B2.avif",
      },
      {
        name: "Buzo Gris",
        price: 65.99,
        stock: 15,
        createdAt: new Date(),
        image: "/assets/B3.avif",
      },
      {
        name: "Pantalon Gris",
        price: 48.00,
        stock: 100,
        createdAt: new Date(),
        image: "/assets/C.avif",
      },
      {
        name: "Buzo Gris",
        price: 65.99,
        stock: 60,
        createdAt: new Date(),
        image: "/assets/C1.avif",
      },
      {
        name: "Pantalon Negro",
        price: 48.00,
        stock: 20,
        createdAt: new Date(),
        image: "/assets/C2.avif",
      },
      {
        name: "Remera Amarilla",
        price: 48.00,
        stock: 20,
        createdAt: new Date(),
        image: "/assets/X.avif",
      },
      {
        name: "Remera Blanca",
        price: 48.00,
        stock: 20,
        createdAt: new Date(),
        image: "/assets/X1.avif",
      },
    ],
  });

  console.log("✅ Productos creados exitosamente.");
}

main()
  .catch((error) => {
    console.error("❌ Error al sembrar la base de datos:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });