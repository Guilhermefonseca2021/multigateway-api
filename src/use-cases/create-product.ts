import { Prisma } from "@prisma/client";
import { ProductRepository } from "../repositories/prisma/product-repository";

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(data: Prisma.ProductCreateInput) {
    const existing = await this.productRepository.findByName(data.name);
    if (existing) {
      throw new Error("Já existe um produto com esse nome.");
    }

    const product = await this.productRepository.create({
      name: data.name,
      amount: data.amount,
    });

    return {
      ...product,
      amount: parseFloat(product.amount.toString()),
    };
  }
}
