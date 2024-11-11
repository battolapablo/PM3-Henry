import { Router } from "express";
import { createUser, getUser, deleteUser, getUserById } from "../controllers/userController";
import auth from "../middlewares/auth";

const router: Router = Router();

router.post("/users", createUser);

router.get("/users", auth, getUser);
router.get("/users/:id", getUserById)

router.delete("/users", deleteUser);

export default router;
