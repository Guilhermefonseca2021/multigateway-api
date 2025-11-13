import { Prisma, Product } from "@prisma/client";

export interface ProductRepository {
  findById(productId: string): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  create(data: Prisma.ProductCreateInput): Promise<Product>;
  update(productId: string, data: Prisma.ProductUpdateInput): Promise<Product>;
  delete(productId: string): Promise<void>;
}
