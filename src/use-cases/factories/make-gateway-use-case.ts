import { PrismaGatewayRepository } from "../../repositories/prisma/gateway-repository";
import { ManageGatewayUseCase } from "../gateway-use-case";

export function makeManageGatewayUseCase() {
  const gatewayRepository = new PrismaGatewayRepository();
  const manageGatewayUseCase = new ManageGatewayUseCase(gatewayRepository);
  return manageGatewayUseCase;
}
