import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Appointments } from "../entities/Appointments";
import { Credential } from "../entities/Credential";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Bautista135",
  database: "battopm3",
  dropSchema: true,
  synchronize: true,
  logging: false,
  entities: [User, Appointments, Credential],
  subscribers: [],
  migrations: [],
});

export const UserModel = AppDataSource.getRepository(User);
export const AppointmentModel = AppDataSource.getRepository(Appointments);
export const CredentialModel = AppDataSource.getRepository(Credential);
