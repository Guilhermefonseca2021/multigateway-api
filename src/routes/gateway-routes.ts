import { Router } from "express";
import checkAuth from "../middlewares/checkAuth";
import { activateGateway, createGateway, listGateways, updateGatewayPriority } from "../controllers/gatewayControllers";

const gatewayRoutes = Router();

gatewayRoutes.use(checkAuth);
gatewayRoutes.get("/", listGateways);
gatewayRoutes.post("/", createGateway);
gatewayRoutes.patch("/:id/priority", updateGatewayPriority);
gatewayRoutes.patch("/:id/activate", activateGateway);

export default gatewayRoutes;
