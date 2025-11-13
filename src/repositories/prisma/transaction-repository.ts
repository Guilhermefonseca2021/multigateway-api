import { Prisma, Transaction } from "@prisma/client";

export interface TransactionsRepository {
  create(data: Prisma.TransactionCreateInput): Promise<Transaction>;
  createCharge(data: any): Promise<any>;
  deleteCharge(id: string): Promise<any>;
  getCharge(id: string): Promise<any>;
}
