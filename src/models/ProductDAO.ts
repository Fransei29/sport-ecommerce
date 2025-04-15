import prisma from "@/lib/db";

export class ProductDAO {
  static async getAllProducts() {
    return await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        image: true, 
        createdAt: true,
      },
    });
  }

  static async getProductById(id: string) {
    return await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        image: true,
        createdAt: true,
      },
    });
  }

  static async getFeaturedProducts(limit = 4) {
    return await prisma.product.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        image: true,
        createdAt: true,
      },
    });
  }
}
