import { Prisma, Gateway } from "@prisma/client";
import { prisma } from "../../libs/prisma";
import { GatewaysRepository } from "./gateway-repository";

export class PrismaGatewaysRepository implements GatewaysRepository {
  async create(data: Prisma.GatewayCreateInput) {
    return prisma.gateway.create({ data });
  }

  async changeActivity(id: string, isActive: boolean) {
    return prisma.gateway.update({
      where: { id },
      data: { is_active: isActive },
    });
  }

  async priority(id: string, position: number): Promise<Gateway> {
    return prisma.gateway.update({   
      where: { id },
      data: { priority: position },
    });
  }
}
