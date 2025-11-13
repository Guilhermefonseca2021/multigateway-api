import { Prisma, Transaction } from "@prisma/client";
import { TransactionsRepository } from "./transaction-repository";
import { prisma } from "../../libs/prisma";

export class PrismaTransactionsRepository implements TransactionsRepository {
  async create(data: Prisma.TransactionCreateInput): Promise<Transaction> {
    const safeData = {
      clientId: String(data.clientId || "default-client"),
      gatewayId: String(data.gatewayId || "default-gateway"),
      external_id: String(data.external_id || `EXT-${Date.now()}`),
      status: String(data.status),
      amount: new Prisma.Decimal(Number(data.amount)),
      name: String(data.name),
      email: String(data.email),
      cardNumber: String(data.cardNumber),
      cvv: String(data.cvv),
      card_last_numbers: String(data.card_last_numbers || "").slice(-4),
      products: data.products ? JSON.parse(JSON.stringify(data.products)) : undefined,
      createdAt: new Date(),
    };

    const transaction = await prisma.transaction.create({
      data: safeData,
    });

    return transaction;
  }

  async createCharge(data: any): Promise<any> {
    return {
      success: true,
      external_id: `CHARGE-${Date.now()}`,
      ...data,
    };
  }

  async deleteCharge(id: string): Promise<any> {
    await prisma.transaction.delete({
      where: { id },
    });

    return { success: true, message: "Transação excluída com sucesso" };
  }

  async getCharge(id: string): Promise<any> {
    const charge = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!charge) throw new Error("Transação não encontrada");

    return charge;
  }
}
