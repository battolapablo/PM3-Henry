import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { preloadUserData } from "./helpers/preloadData";
import { preloadAppointmentData } from "./helpers/preloadData";

const initializeApp = async () => {
  await AppDataSource.initialize();
  await preloadUserData();
  await preloadAppointmentData();
  server.listen(PORT, () => {
    console.log(`Server Listen on ${PORT}`);
  });
};

initializeApp();
