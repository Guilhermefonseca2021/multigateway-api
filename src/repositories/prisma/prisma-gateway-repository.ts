import { Gateway, PrismaClient } from "@prisma/client";
import {  GatewayRepository } from "./gateway-repository";


export class PrismaGatewayRepository implements GatewayRepository {
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

