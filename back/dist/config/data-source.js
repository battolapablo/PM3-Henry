"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialModel =
  exports.AppointmentModel =
  exports.UserModel =
  exports.AppDataSource =
    void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Appointments_1 = require("../entities/Appointments");
const Credential_1 = require("../entities/Credential");
exports.AppDataSource = new typeorm_1.DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Bautista135",
  database: "battopm3",
  dropSchema: true,
  synchronize: true,
  logging: true,
  entities: [User_1.User, Appointments_1.Appointments, Credential_1.Credential],
  subscribers: [],
  migrations: [],
});
exports.UserModel = exports.AppDataSource.getRepository(User_1.User);
exports.AppointmentModel = exports.AppDataSource.getRepository(
  Appointments_1.Appointments
);
exports.CredentialModel = exports.AppDataSource.getRepository(
  Credential_1.Credential
);
