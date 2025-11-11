import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { makeRegisterUseCase } from "../use-cases/factories/make-register-use-case";
import { makeLoginUseCase } from "../use-cases/factories/make-login-use-case";

export async function register(req: Request, res: Response) {
  const registerBodySchema = z.object({
    email: z.email(),
    password: z.string().min(8),
    role: z.string().optional(),
  });

  const { email, password, role } = registerBodySchema.parse(req.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    const { user } = await registerUseCase.execute({
      email,
      password,
      role,
    });

    const token = jwt.sign(
      { sub: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "21d" }
    );

    return res.status(201).json({
      message: "Usuário registrado com sucesso",
      user,
      token,
    });
  } catch (err: any) {
    return res.status(409).json({ message: err.message });
  }
}

export async function login(req: Request, res: Response) {
  const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
  });

  const { email, password } = loginSchema.parse(req.body);

  try {
    const loginUseCase = makeLoginUseCase();

    const { user } = await loginUseCase.execute({ email, password });

    const token = jwt.sign(
      { sub: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "21d" }
    );

    return res.status(200).json({
      message: "Login realizado com sucesso",
      user,
      token,
    });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
}


export function logout(req: Request, res: Response) {
  const authHeader = req.headers["authorization"];
  const blacklist: Record<string, boolean> = {};

  if (!authHeader) {
    return res.status(400).json({ error: "Token não informado" });
  }

  const token = authHeader.replace("Bearer ", "");

  blacklist[token] = true;

  const expiresInSeconds = 100;
  setTimeout(() => delete blacklist[token], expiresInSeconds * 1000);

  return res.json({ message: "Logout realizado", token: null });
};