import { ProductRepository } from "../repositories/prisma/product-repository";

export class ListProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute() {
    const products = await this.productRepository.findAll();

    return products.map((product: any) => ({
      ...product,
      amount: parseFloat(product.amount.toString()),
    }));
  }
}
