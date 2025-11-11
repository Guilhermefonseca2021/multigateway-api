import express from "express";
import config from "./config/config";
import userRouter from "./routes/user-routes";

const isAuthDisabled = config.auth;

const app = express();
app.use(express.json());

// Prefixo padrão
console.log("✅ INDEX CARREGADO DE VERDADE");
app.use("/users", userRouter);

app.listen(
  config.port || 3000,
  () =>
    console.log(`🚀 The server is running at ${config.port} | http://localhost:3000\n⚠️  AVISO! Autenticação desativada: ${isAuthDisabled}`)
);
