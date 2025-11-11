import config from "../config/config";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: config.auth  === "true" ? ['query'] : [],
    
});