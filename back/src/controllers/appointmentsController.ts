import { Request, Response } from "express";
import {
  getAllAppointmentsService,
  getAppointmentByIdService,
  createAppointmentService,
  cancelAppointmentService,
  getAppointmentByUserService,
} from "../services/appoinmentsService";
import { Appointments } from "../entities/Appointments";
import { CreateAppointmentDto } from "../dto/AppointmentDto";

export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments: Appointments[] = await getAllAppointmentsService();
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los turnos" });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const appointmentId = parseInt(id, 10);
    const appointment: Appointments | void = await getAppointmentByIdService(
      appointmentId
    );
    if (appointment) {
      res.status(200).json(appointment);
    } else {
      res.status(404).json({ error: "Turno no encontrado" });
    }
  } catch (err) {
    res.status(404).json({ error: "Turno no encontrado" });
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { userId, date, time, reason } = req.body;

    if (!userId || !date || !time || !reason) {
      return res.status(400).json({
        error: "Faltan datos para crear el turno",
      });
    }

    const appointmentData: CreateAppointmentDto = {
      userId,
      date,
      time,
      reason,
      status: "Activo",
    };

    const newAppointment = await createAppointmentService(appointmentData);

    if (!newAppointment) {
      throw new Error("No se pudo crear el turno");
    }

    res.status(201).json(newAppointment);
  } catch (err) {
    console.error("Error al crear el turno:", err);
    res.status(400).json({
      error: "Error al crear el turno, algunos datos son incorrectos",
    });
  }
};

export const cancelAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const appointmentId = parseInt(id, 10);
    if (isNaN(appointmentId)) {
      return res
        .status(400)
        .json({ error: "El ID proporcionado no es válido" });
    }
    const appointment = await cancelAppointmentService(appointmentId);
    if (appointment) {
      res.status(200).json({ message: "Turno cancelado con éxito" });
    } else {
      res.status(404).json({ error: "Turno no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error al cancelar el turno" });
  }
};

export const getAppointmentByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.body.id;
    const appointments: Appointments[] = await getAppointmentByUserService(
      userId
    );
    if (appointments) {
      res.status(200).json(appointments);
    } else {
      res.status(404).json({ error: "No hay turnos para este usuario" });
    }
  } catch (err) {
    res.status(404).json({ error: "Turno no encontrado" });
  }
};
