import { PrismaTransactionsRepository } from "../../repositories/prisma/prisma-transaction-repository";
import { CreateTransactionUseCase } from "../create-transaction-use-case";

export function makeCreateTransactionUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository();
  const createTransactionUseCase = new CreateTransactionUseCase(transactionsRepository);

  return createTransactionUseCase;
}
