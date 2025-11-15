import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryProductsRepository } from "../../repositories/prisma/in-memory/in-memory-products-repository";
import { CreateProductUseCase } from "../create-product";
import { randomUUID } from "crypto";

let productsRepository: InMemoryProductsRepository;
let sut: CreateProductUseCase


describe("Create Product Use Case", () => {
    beforeEach(() => {
        productsRepository = new InMemoryProductsRepository();
        sut = new CreateProductUseCase(productsRepository);
    });
    it("should be able to create a new product", async () => {
        const product = await sut.execute({
            id: randomUUID(),
            name: "Product Test",
            amount: 100,
        });

        expect(product.name).toEqual(expect.any(String));
    });
})