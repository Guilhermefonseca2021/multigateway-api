import { Request, Response } from "express";
import { z } from "zod";
import { makeCreateProductUseCase } from "../use-cases/factories/make-create-product-use-case";
import { makeListProductUseCase } from "../use-cases/factories/make-list-products-use-case";

const productBodySchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  amount: z.preprocess(
    (val) => Number(val),
    z.number().positive("O valor deve ser positivo")
  ),
});

export async function create(req: Request, res: Response) {
  try {
    const { name, amount } = productBodySchema.parse(req.body);
    const createProductUseCase = makeCreateProductUseCase();

    const product = await createProductUseCase.execute({ name, amount });

    return res.status(201).json({
      message: "Produto criado com sucesso",
      product,
    });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
}

export async function list(req: Request, res: Response) {
  try {
    const listProductUseCase = makeListProductUseCase();

    const products = await listProductUseCase.execute();

    return res.status(200).json({
      message: "Lista de produtos recuperada com sucesso",
      products,
    });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
}
