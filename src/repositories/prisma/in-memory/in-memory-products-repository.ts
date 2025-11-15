import { Prisma, Product } from "@prisma/client";
import { randomUUID } from "crypto";
import { ProductRepository } from "../product-repository";

export class InMemoryProductsRepository implements ProductRepository {
  public items: Product[] = [];

  async findByName(name: string): Promise<Product | null> {
    const product = this.items.find((item) => item.name === name);
    return product ?? null;
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.items.find((item) => item.id === id);
    return product ?? null;
  }

  async findAll(): Promise<Product[]> {
    return this.items.sort((a, b) => a.name.localeCompare(b.name));
  }

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    const product: Product = {
      id: randomUUID(),
      name: data.name,
      amount: new Prisma.Decimal((data.amount as any)?.set ?? data.amount),
    };

    this.items.push(product);
    return product;
  }

  async update(
    productId: string,
    data: Prisma.ProductUpdateInput
  ): Promise<Product> {
    const index = this.items.findIndex((item) => item.id === productId);
    if (index === -1) throw new Error("Product not found");

    const updated = {
      ...this.items[index],
      ...data,
    } as Product;

    this.items[index] = updated;
    return updated;
  }

  async delete(productId: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id === productId);
    if (index === -1) throw new Error("Product not found");

    this.items.splice(index, 1);
  }
}
