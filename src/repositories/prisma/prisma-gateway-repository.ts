import { prisma } from "../../libs/prisma";
import { Gateway, Prisma } from "@prisma/client";
import { GatewaysRepository } from "./gateway-repository";

export class PrismaGatewaysRepository implements GatewaysRepository {
  constructor() {}

  create(data: Prisma.GatewayCreateInput): Promise<Gateway> {
    return prisma.gateway.create({ data });
  }

  changeActivity(): Boolean {
    return !prisma.gateway.fields.is_active;
  }

  async priority(position: number) {
    const gateways = await prisma.gateway.findMany({
      orderBy: { priority: "asc" },
    });

    if (gateways.length !== 2) {
      throw new Error("É necessário ter exatamente 2 gateways.");
    }

    return prisma.gateway.update({
      where: { id: gateways[position].id },
      data: { priority: position },
    });
  }
}
