import { PrismaClient } from "@prisma/client"; 
import { createRequire } from "module"; 
const require = createRequire(import.meta.url);


const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Seeding database...");

  // Crear un usuario de prueba
  const user = await prisma.user.upsert({
    where: { email: "franco@gmail.com" },
    update: {},
    create: {
      email: "franco@gmail.com",
      password: "123456", // ⚠️ En producción, usa bcrypt para encriptar esto
      name: "Franco Seiler",
    },
  });

  console.log("✅ Usuario creado:", user);
}

  console.log("Seeding database...");

  await prisma.product.createMany({
    data: [
      {
        name: "Camiseta Deportiva Negra",
        price: 29.99,
        stock: 50,
        createdAt: new Date(),
        image:'/assets/product1.jpg'
      },
      {
        name: "Zapatillas Running Pro",
        price: 79.99,
        stock: 30,
        createdAt: new Date(),
        image:'/assets/product2.jpg'
      },
      {
        name: "Shorts Deportivos Azul",
        price: 19.99,
        stock: 20,
        createdAt: new Date(),
        image:'/assets/product3.jpg'
      },
    ],
  });

  console.log("Database seeded successfully.");

main()
  .catch((error) => {
    console.error("Error seeding database:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
