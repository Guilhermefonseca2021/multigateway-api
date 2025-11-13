import { PrismaProductRepository } from "../../repositories/prisma/prisma-products-repository";
import { ListProductsUseCase } from "../list-products-use-case";

export function makeListProductUseCase() {
  const productRepository = new PrismaProductRepository();
  const useCase = new ListProductsUseCase(productRepository);
  return useCase;
}
