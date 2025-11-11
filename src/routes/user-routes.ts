import { Router } from "express";
import { login, logout, register } from "../controllers/usersControllers";

const userRouter = Router();

console.log("✅ userRouter VERSÃO CORRIGIDA carregado!");

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.post("/logout", logout);

export default userRouter;
