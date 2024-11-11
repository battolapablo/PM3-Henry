import CredentialRepository from "../repositories/CredentialRepository";
import { AppDataSource } from "../config/data-source";
import UserRepository from "../repositories/UserRepository";
import AppointmentRepository from "../repositories/AppointmentRepository";
import { userPreload } from "../helpers/preloadUserData";
import { appointmentPreload } from "./preloadAppointmentData";

export const preloadUserData = async () => {
  if (userPreload.length === 0) {
    console.log(
      "No hay usuarios en el arreglo userPreload. La precarga no se realizará."
    );
    return;
  }

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  try {
    await queryRunner.startTransaction();

    const userPromises = userPreload.map(async (user) => {
      const newUser = UserRepository.create(user);
      await queryRunner.manager.save(newUser);

      const newCredential = CredentialRepository.create({
        username: user.username,
        password: user.password,
        user: newUser,
      });
      await queryRunner.manager.save(newCredential);

      newUser.credentials = newCredential;
      await queryRunner.manager.save(newUser);
    });

    await Promise.all(userPromises);
    await queryRunner.commitTransaction();
    console.log("Precarga de usuarios y credenciales realizada con éxito");
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.log("Error al intentar crear los usuarios y credenciales:", error);
  } finally {
    console.log("Ha finalizado el intento de precarga de usuarios");
    await queryRunner.release();
  }
};

export const preloadAppointmentData = async () => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  const promises = appointmentPreload.map(async (appointment) => {
    const newAppointment = await AppointmentRepository.create(appointment);
    await queryRunner.manager.save(newAppointment);
    const user = await UserRepository.findOneBy({ id: appointment.userId });
    if (!user) throw Error("Usuario inexistente");
    newAppointment.user = user;
    await queryRunner.manager.save(newAppointment);
  });
  try {
    await queryRunner.startTransaction();
    await Promise.all(promises);
    await queryRunner.commitTransaction();
    console.log("Precarga de turnos realizada con éxito");
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.log("Error al intentar crear los turnos");
  } finally {
    console.log("Ha finalizado el intento de pre carga");
    await queryRunner.release();
  }
};
