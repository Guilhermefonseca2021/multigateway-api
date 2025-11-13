// repositories/gateway-repository.ts
import { PrismaClient, Gateway } from "@prisma/client";

export interface IGatewayRepository {
  findAll(): Promise<Gateway[]>;
  findById(id: string): Promise<Gateway | null>;
  create(data: Omit<Gateway, "id">): Promise<Gateway>;
  updatePriority(id: string, priority: number): Promise<Gateway>;
  activateGateway(id: string, is_active: boolean): Promise<Gateway>;
}

export class PrismaGatewayRepository implements IGatewayRepository {
  private prisma = new PrismaClient();

  async findAll(): Promise<Gateway[]> {
    return this.prisma.gateway.findMany({
      orderBy: { priority: "asc" },
    });
  }

  async findById(id: string): Promise<Gateway | null> {
    return this.prisma.gateway.findUnique({ where: { id } });
  }

  async create(data: Omit<Gateway, "id">): Promise<Gateway> {
    return this.prisma.gateway.create({ data });
  }

  async updatePriority(id: string, priority: number): Promise<Gateway> {
    return this.prisma.gateway.update({
      where: { id },
      data: { priority },
    });
  }

  async activateGateway(id: string, is_active: boolean): Promise<Gateway> {
    return this.prisma.gateway.update({
      where: { id },
      data: { is_active },
    });
  }
}
