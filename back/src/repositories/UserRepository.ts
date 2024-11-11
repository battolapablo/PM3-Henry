import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { Appointments } from "../entities/Appointments";

const UserRepository = AppDataSource.getRepository(User).extend({
  findById: async function (id: number): Promise<User> {
    const user = await this.findOneBy({ id });
    if (user) return user;
    else throw Error("Invalid ID");
  },

  checkById: async function (id: number): Promise<boolean> {
    const user = await this.findOneBy({ id });
    return !!user;
  },
  appointmentByUser: async function appointmentByUser(
    id: number
  ): Promise<Appointments[]> {
    const data = await this.findOne({
      where: { id: id },
      relations: ["appointment"],
    });

    if (!data) {
      throw new Error("No se encontró el usuario con el ID proporcionado");
    }

    if (!data.appointment) {
      throw new Error("El usuario no tiene citas asociadas");
    }

    return data.appointment;
  },
});

export default UserRepository;
