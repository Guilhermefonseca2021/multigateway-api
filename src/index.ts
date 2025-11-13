import express from "express";
import config from "./config/config";
import userRouter from "./routes/user-routes";
import { zodErrorHandler } from "./use-cases/errors/zod-error";
import productRouter from "./routes/product-routes";
import transactionRoutes from "./routes/transaction-routes";
import gatewayRoutes from "./routes/gateway-routes";

const isAuthDisabled = config.auth;

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/transactions", transactionRoutes);
app.use("/gateways", gatewayRoutes);

app.use(zodErrorHandler);

app.listen(
  config.port || 3000,
  () =>
    console.log(`🚀 The server is running at ${config.port} | http://localhost:3001\n⚠️  AVISO! Autenticação esta usando ${isAuthDisabled}`)
);   
