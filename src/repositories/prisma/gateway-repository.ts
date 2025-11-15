import { Gateway } from "@prisma/client";

export interface GatewayRepository {
  findAll(): Promise<Gateway[]>;
  findById(id: string): Promise<Gateway | null>;
  create(data: Omit<Gateway, "id">): Promise<Gateway>;
  updatePriority(id: string, priority: number): Promise<Gateway>;
  activateGateway(id: string, is_active: boolean): Promise<Gateway>;
}
