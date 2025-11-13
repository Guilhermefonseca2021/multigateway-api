import { Prisma, Product } from "@prisma/client";
import { ProductRepository } from "./product-repository";
import { prisma } from "../../libs/prisma";

export class PrismaProductRepository implements ProductRepository {
  async findById(productId: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id: productId },
    });
  }

  async findByName(name: string): Promise<Product | null> {
    return prisma.product.findFirst({
      where: { name },
    });
  }

  async findAll(): Promise<Product[]> {
    return prisma.product.findMany({
      orderBy: { name: "asc" },
    });
  }

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return prisma.product.create({
      data,
    });
  }

  async update(productId: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return prisma.product.update({
      where: { id: productId },
      data,
    });
  }

  async delete(productId: string): Promise<void> {
    await prisma.product.delete({
      where: { id: productId },
    });
  }
}
