import { uuid } from "zod";
import { TransactionsRepository } from "../repositories/prisma/transaction-repository";

interface CreateTransactionUseCaseRequest {
  amount: number;
  name: string;
  email: string;
  cardNumber: string;
  cvv: string;
}

interface CreateTransactionUseCaseResponse {
  transaction: {
    id: string;
    amount: number;
    name: string;
    email: string;
    status: string;
  };
}

export class CreateTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    amount,
    name,
    email,
    cardNumber,
    cvv,
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    if (cvv === "100" || cvv === "200") {
      throw new Error("Dados inválidos do cartão");
    }

    const last4 = cardNumber.slice(-4);

    const transaction = await this.transactionsRepository.create({
      external_id: uuid(),
      status: "approved",
      amount,
      name,
      email,
      cardNumber,
      cvv,
      card_last_numbers: last4,
    } as any);

    return {
      transaction: {
        id: transaction.id,
        amount: Number(transaction.amount),
        name: transaction.name,
        email: transaction.email,
        status: transaction.status,
      },
    };
  }
}
