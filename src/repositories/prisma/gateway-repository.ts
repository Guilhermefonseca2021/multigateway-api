import { Prisma, Gateway } from "@prisma/client"

export interface GatewaysRepository {
    create(gateways: Prisma.GatewayCreateInput): Promise<Gateway>;
    changeActivity(): Boolean;
    priority(position: number): Promise<Gateway>;
} 