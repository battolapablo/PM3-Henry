import { Router } from "express";
import { appointmentsRouter } from "./appointmentsRouter";
import { usersRouter } from "./usersRouter";

const indexRouter: Router = Router();

indexRouter.use("/appointments", appointmentsRouter);
indexRouter.use("/users", usersRouter);

export default indexRouter;
