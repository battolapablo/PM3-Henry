import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
} from "../controllers/usersController";
import { confirmUser } from "../controllers/usersController";
import { validateCreateUser } from "../middlewares/validateCreateUser";
import { validateUserLogin } from "../middlewares/validateLoginUser";

export const usersRouter: Router = Router();

usersRouter.get("/confirm/:token", confirmUser);
usersRouter.get("/users", getAllUsers);
usersRouter.post("/users/register", validateCreateUser, createUser);
usersRouter.post("/users/login", validateUserLogin, loginUser);
usersRouter.get("/users/:id", getUserById);

export default usersRouter;
