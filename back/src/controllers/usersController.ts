import { Request, Response } from "express";
import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  confirmUserService,
} from "../services/usersService";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";

import UserRepository from "../repositories/UserRepository";
import CredentialRepository from "../repositories/CredentialRepository";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: User[] = await getAllUsersService();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, birthdate, nDni, username, password } = req.body;
    if (!name || !email || !birthdate || !nDni || !username || !password) {
      return res.status(400).json({ message: "Faltan datos por completar!!" });
    }

    const newUser: User = await createUserService({
      name,
      email,
      birthdate,
      nDni,
      username,
      password,
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: "Los datos son incorrectos!" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(`Buscando usuario con ID: ${id}`);

    const userId = parseInt(id, 10);
    if (isNaN(userId) || userId <= 0) {
      return res.status(400).json({ message: "ID de usuario inválido." });
    }

    const user: User | null = await getUserByIdService(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, password } = req.body;

  try {
    const credential = await CredentialRepository.findOne({
      where: { username, password },
    });

    if (!credential) {
      return res
        .status(400)
        .json({ message: "El usuario o contraseña son incorrectos." });
    }

    const user = await UserRepository.findOne({
      where: { credentials: { id: credential.id } },
      relations: ["credentials"],
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "El usuario o contraseña son incorrectos." });
    }

    if (!user.confirmed) {
      return res
        .status(400)
        .json({ message: "La cuenta no ha sido confirmada aún." });
    }

    return res.status(200).json({ login: true, user: user });
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const confirmUser = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, "tu-secreto") as { userId: string };
    await confirmUserService(decoded.userId);
    res.redirect("http://localhost:5173/");
  } catch (error) {
    res.status(400).json({ message: "Token inválido o expirado." });
  }
};
