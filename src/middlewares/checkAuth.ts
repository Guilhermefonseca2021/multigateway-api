import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { InvalidCredentialError } from "../use-cases/errors/invalid-credentials-error";
import { blacklist } from "../controllers/usersControllers";

export default function checkAuth(req: Request, res: Response, next: NextFunction) {
  if (config.auth === "") {
    return next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Token não fornecido",
    });
  }

  const token = authHeader.replace("Bearer ", "").trim();

  if (blacklist[token]) {
    return res.status(403).json({
      error: "Token inválido (blacklist)",
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwt_secretKey!);
    (req as any).user = decoded;
    return next();
  } catch (error: any) {
    if (error instanceof InvalidCredentialError) {
      return res.status(401).json({
        error: "Credenciais inválidas",
      });
    }

    return res.status(403).json({
      error: "Token inválido ou expirado",
      details: error.message,
    });
  }
}
