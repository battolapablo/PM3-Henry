import { Request, Response, NextFunction } from "express";
export const validateUserLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  if (!username || typeof username !== "string" || username.trim() === "") {
    return res
      .status(400)
      .json({ message: "Nombre de usuario es obligatorio." });
  }

  if (!password || typeof password !== "string" || password.trim() === "") {
    return res.status(400).json({ message: "Contraseña es obligatoria." });
  }

  next();
};
