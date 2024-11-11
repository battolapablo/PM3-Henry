import { Router } from "express";
import {
  getAllAppointments,
  createAppointment,
  getAppointmentById,
  cancelAppointment,
  getAppointmentByUser,
} from "../controllers/appointmentsController";
import CatchAsync from "../middlewares/CatchAsync";
import { validateAppointmentData } from "../middlewares/validateCreateAppointment";

export const appointmentsRouter: Router = Router();

appointmentsRouter.get("/appointments", getAllAppointments);
appointmentsRouter.post("/appointments/byUser", getAppointmentByUser);
appointmentsRouter.post(
  "/appointments/schedule",
  validateAppointmentData,
  CatchAsync(createAppointment)
);
appointmentsRouter.get("/appointments/:id", getAppointmentById);
appointmentsRouter.put("/appointments/cancel/:id", cancelAppointment);


export default appointmentsRouter;
