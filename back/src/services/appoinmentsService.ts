import { AppDataSource } from "../config/data-source";
import AppointmentRepository from "../repositories/AppointmentRepository";
import UserRepository from "../repositories/UserRepository";
import { CreateAppointmentDto } from "../dto/AppointmentDto";
import { Appointments } from "../entities/Appointments";

export const getAllAppointmentsService = async (): Promise<Appointments[]> => {
  try {
    const appointments = await AppointmentRepository.find();
    if (appointments.length === 0) {
      throw new Error("No se encontraron turnos");
    }
    return appointments;
  } catch (error) {
    console.error("Error al obtener los turnos:", error);
    throw new Error("Error al obtener los turnos");
  }
};

export const getAppointmentByIdService = async (
  id: number
): Promise<Appointments | void> => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();

    const appointment = await queryRunner.manager.findOne(Appointments, {
      relations: ["user"],
      where: { id },
    });

    if (!appointment) {
      throw new Error(`Turno no encontrado con ID: ${id}`);
    }

    await queryRunner.commitTransaction();
    return appointment;
  } catch (error) {
    console.error(`El turno con ID ${id} no existe`);
    await queryRunner.rollbackTransaction();
    throw new Error("Error al obtener el turno. Inténtelo nuevamente.");
  } finally {
    await queryRunner.release();
  }
};

export const createAppointmentService = async (
  appointmentData: CreateAppointmentDto
): Promise<Appointments | void> => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  try {
    await queryRunner.startTransaction();

    const user = await UserRepository.findOneById(appointmentData.userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const newAppointment = AppointmentRepository.create(appointmentData);
    newAppointment.user = user;

    await queryRunner.manager.save(newAppointment);
    await queryRunner.commitTransaction();

    return newAppointment;
  } catch (error) {
    console.error("Error al crear el turno:", error);
    await queryRunner.rollbackTransaction();
    throw new Error("No se pudo crear el turno");
  } finally {
    await queryRunner.release();
  }
};

export const cancelAppointmentService = async (
  id: number
): Promise<Appointments | null> => {
  if (typeof id !== "number" || id <= 0) {
    throw new Error("ID de turno inválido");
  }
  try {
    const appointment = await AppointmentRepository.findOneBy({ id });
    if (!appointment) {
      throw new Error("Turno no encontrado");
    }
    appointment.status = "Cancelado";
    await AppointmentRepository.save(appointment);
    return appointment;
  } catch (error) {
    console.error(`Error al cancelar el turno con ID ${id}:`, error);
    throw new Error("El turno que intentas cancelar no existe");
  }
};

export const getAppointmentByUserService = async (userId: number) => {
  try {
    const appointments = await UserRepository.appointmentByUser(userId);
    return appointments;
  } catch {
    throw new Error("Error al obetener los turnos");
  }
};
