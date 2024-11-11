import { Request, Response, NextFunction } from "express";

export const validateAppointmentData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, date, time, reason } = req.body;

  if (!userId || !date || !time || !reason) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  const currentDate = new Date();
  const nextDay = new Date();
  nextDay.setDate(currentDate.getDate() + 1);

  const maxDate = new Date();
  maxDate.setDate(currentDate.getDate() + 14);

  const appointmentDate = new Date(date);

  if (
    isNaN(appointmentDate.getTime()) ||
    appointmentDate < nextDay ||
    appointmentDate > maxDate
  ) {
    return res.status(400).json({
      error:
        "La fecha no debe exceder los 14 días desde la fecha actual.",
    });
  }

  const timeRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;

  if (
    !timeRegex.test(time) ||
    !["00", "30"].includes(time.slice(-2)) ||
    time < "09:00" ||
    time > "17:00"
  ) {
    return res.status(400).json({
      error:
        "La hora es obligatoria y debe estar en intervalos de 30 minutos entre las 09:00 y las 17:00.",
    });
  }

  if (
    typeof reason !== "string" ||
    reason.trim() === "" ||
    reason.length > 255
  ) {
    return res.status(400).json({
      error: "El motivo es obligatorio",
    });
  }

  next();
};
