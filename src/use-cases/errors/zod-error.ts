import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function zodErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    const formattedErrors = err.issues.map((issue) => {
      const error: Record<string, any> = {
        field: issue.path.join("."),
        message: issue.message,
        code: issue.code,
      };

      if (issue.code === "too_small") {
        error.minimum = issue.minimum;
        error.inclusive = issue.inclusive;
      }

      return error;
    });

    return res.status(400).json({
      status: "validation_error",
      message: "Erro de validação nos campos enviados.",
      errors: formattedErrors,
    });
  }

  next(err);
}
