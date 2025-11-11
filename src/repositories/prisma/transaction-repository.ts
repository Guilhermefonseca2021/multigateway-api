import { Gateway, Prisma } from "@prisma/client";

export interface TransactionsRepository {
  create(gateway: Prisma.GatewayCreateInput): Promise<Gateway>;
  createCharge(data: any): Promise<any>;
  deleteCharge(id: string): Promise<any>;
  getCharge(id: string): Promise<any>;
  createSubscription(data: any): Promise<any>;
  getSubscription(id: string): Promise<any>;
  createCustomer(data: any): Promise<any>;
  getCustomer(id: string): Promise<any>;
  getChargeByCustomer(data: any): Promise<any>;
}
