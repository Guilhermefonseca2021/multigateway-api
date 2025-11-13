import { Request, Response } from "express";
import { PrismaGatewayRepository } from "../repositories/prisma/gateway-repository";
import { makeManageGatewayUseCase } from "../use-cases/factories/make-gateway-use-case";

const gatewayRepository = new PrismaGatewayRepository();

export async function listGateways(req: Request, res: Response) {
  try {
    const gateways = await gatewayRepository.findAll();
    return res.status(200).json(gateways);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao listar gateways",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function createGateway(req: Request, res: Response) {
  try {
    const useCase = makeManageGatewayUseCase();
    const result = await useCase.execute({
      action: "CREATE",
      ...req.body,
    });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Erro ao criar gateway",
    });
  }
}

export async function updateGatewayPriority(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { priority } = req.body;

    const useCase = makeManageGatewayUseCase();
    const result = await useCase.execute({
      id,
      priority,
      action: "UPDATE_PRIORITY",
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Erro ao atualizar prioridade",
    });
  }
}

export async function activateGateway(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { is_active } = req.body;

    const useCase = makeManageGatewayUseCase();
    const result = await useCase.execute({
      id,
      is_active,
      action: "ACTIVATE",
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Erro ao ativar/desativar gateway",
    });
  }
}
