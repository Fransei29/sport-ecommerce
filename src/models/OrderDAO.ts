import prisma from "@/lib/db";

export class OrderDAO {
  static async createOrder(userId: string) {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      throw new Error("El carrito está vacío.");
    }

    const totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

    const order = await prisma.order.create({
      data: {
        userId,
        totalPrice,
        items: {
          create: cart.items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: { items: true },
    });

    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return order;
  }

  static async getOrders(userId: string) {
    return await prisma.order.findMany({
      where: { userId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    });
  }
}
