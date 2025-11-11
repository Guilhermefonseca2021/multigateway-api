// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import config from "../config/config";
// import { blacklist } from "../routes/user-routes";

// const isAuthDisabled = config.auth;

// export default function checkAuth(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   if (isAuthDisabled) {
//     return next();
//   }

//   const authHeader = req.headers.authorization;

//   // ✅ Token ausente
//   if (!authHeader) {
//     return res.status(401).json({ message: "No token provided." });
//   }

//   const token = authHeader.replace("Bearer ", "");

//   // ✅ Token está na blacklist?
//   if (blacklist[token]) {
//     return res.status(403).json({ message: "Invalid token." });
//   }

//   // ✅ Verificar validade do JWT
//   try {
//     jwt.verify(token, config.jwt_secretKey!);
//     return next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// }
