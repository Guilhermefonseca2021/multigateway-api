import { Router } from "express";
import checkAuth from "../middlewares/checkAuth";
import { create } from "../controllers/transactionsController";

const transactionRoutes = Router();

transactionRoutes.use(checkAuth);

transactionRoutes.post("/create", create);
// transactionRoutes.post("/:id/charge_back", chargeBack);

export default transactionRoutes;
