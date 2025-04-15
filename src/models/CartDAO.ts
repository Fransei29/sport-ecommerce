import prisma from "@/lib/db";

export class CartDAO {
  static async getCart(userId: string) {
    return await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  // Funcion para eliminar un producto del carrito
  static async removeFromCart(userId: string, productId: string) {
    console.log("Buscando carrito para eliminar producto...", { userId, productId });
  
    const cart = await prisma.cart.findUnique({ where: { userId } });
  
    if (!cart) {
      console.error("Error: Carrito no encontrado.");
      throw new Error("Carrito no encontrado.");
    }
  
    console.log("Carrito encontrado, eliminando producto...");
  
    return await prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productId },
    });
  }
  

   // Funcion para agregar un producto al carrito
  static async addToCart(userId: string, productId: string, quantity: number = 1) {
    console.log("addToCart llamado con:", { userId, productId, quantity });

    // Verificar si el usuario existe antes de crear el carrito
    const userExists = await prisma.user.findUnique({ where: { id: userId } });

    if (!userExists) {
      console.error("Error: Usuario no encontrado en la base de datos.");
      throw new Error("El usuario no existe.");
    }

    // Intentar encontrar el carrito del usuario
    let cart = await prisma.cart.findUnique({ where: { userId } });

    // Si no existe, crearlo
    if (!cart) {
      console.log("Creando nuevo carrito para el usuario...");
      cart = await prisma.cart.create({
        data: { userId, createdAt: new Date() },
      });
      console.log("Carrito creado:", cart);
    }

    // Verificar si el producto ya está en el carrito
    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });

    console.log("Producto en carrito:", existingItem);

    if (existingItem) {
      console.log("Producto ya en el carrito, actualizando cantidad...");
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });

      console.log("Producto actualizado en el carrito:", updatedItem);
      return updatedItem;
    } else {
      console.log("Producto nuevo en el carrito, agregando...");
      const newItem = await prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity },
      });

      console.log("Producto agregado al carrito:", newItem);
      return newItem;
    }
  }

  //  Función para actualizar la cantidad de un producto
  static async updateQuantity(userId: string, productId: string, quantity: number) {
    const cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) return null;

    return await prisma.cartItem.updateMany({
      where: { cartId: cart.id, productId },
      data: { quantity },
    });
  }

  // Función para vaciar el carrito
  static async clearCart(userId: string) {
    const cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) return null;

    return await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
  }
}