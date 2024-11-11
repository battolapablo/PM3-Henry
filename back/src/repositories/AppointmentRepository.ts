import { AppDataSource } from "../config/data-source";
import { Appointments } from "../entities/Appointments";

const AppointmentRepository = AppDataSource.getRepository(Appointments)


export default AppointmentRepository;