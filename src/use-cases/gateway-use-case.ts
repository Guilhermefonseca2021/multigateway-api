// use-cases/manage-gateway-use-case.ts

import { IGatewayRepository } from "../repositories/prisma/gateway-repository";

interface ManageGatewayUseCaseRequest {
  id?: string;
  name?: string;
  priority?: number;
  is_active?: boolean;
  action: "CREATE" | "UPDATE_PRIORITY" | "ACTIVATE";
}

export class ManageGatewayUseCase {
  constructor(private gatewayRepository: IGatewayRepository) {}

  async execute(data: ManageGatewayUseCaseRequest) {
    switch (data.action) {
      case "CREATE":
        if (!data.name) {
          throw new Error("O nome do gateway é obrigatório.");
        }
        return this.gatewayRepository.create({
          name: data.name,
          is_active: true,
          priority: data.priority ?? 0,
        });

      case "UPDATE_PRIORITY":
        if (!data.id || data.priority === undefined) {
          throw new Error("ID e prioridade são obrigatórios.");
        }
        return this.gatewayRepository.updatePriority(data.id, data.priority);

      case "ACTIVATE":
        if (!data.id || data.is_active === undefined) {
          throw new Error("ID e status de ativação são obrigatórios.");
        }
        return this.gatewayRepository.activateGateway(data.id, data.is_active);

      default:
        throw new Error("Ação inválida.");
    }
  }
}
