import { Request, Response } from "express";
import { z } from "zod";
import { makeCreateTransactionUseCase } from "../use-cases/factories/make-create-transaction-use-case";

export async function create(req: Request, res: Response) {
  const transactionBodySchema = z.object({
    amount: z.number().positive("O valor deve ser positivo"),
    name: z.string().min(1, "O nome é obrigatório"),
    email: z.email("Email inválido"),
    cardNumber: z
      .string()
      .length(16, "O número do cartão deve conter 16 dígitos"),
    cvv: z
      .string()
      .length(3, "O CVV deve conter 3 dígitos")
      .refine((cvv) => cvv !== "100" && cvv !== "200", {
        message: "CVV inválido — simulação de erro de cartão",
      }),
  });

  try {
    const { amount, name, email, cardNumber, cvv } = transactionBodySchema.parse(req.body);

    const createTransactionUseCase = makeCreateTransactionUseCase();

    const { transaction } = await createTransactionUseCase.execute({
      amount,
      name,
      email,
      cardNumber,
      cvv,
    });

    return res.status(201).json({
      message: "Transação criada com sucesso",
      transaction,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error });
    }

    console.error(error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
